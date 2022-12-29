import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { StudyMeta } from "./types";

export const codeSampleDistribution = `# Get all customers in the distribution table
def getAllInDistribution(tag = None, branch = None):
  deployConfig = config.getConfig()
  dynamoClient = boto3.client('dynamodb', region_name=deployConfig['REGION'])
  result = dynamoClient.scan(TableName=deployConfig['CUSTOMER_DEPLOY_DISTRIBUTION_TABLE'])
  data = result['Items']

  while 'LastEvaluatedKey' in result:
    result = table.scan(ExclusiveStartKey=result['LastEvaluatedKey'])
    data.extend(result['Items'])

  results = []
  for item in data:
    dataItem = {
      'companyId': item['companyId']['S'],
      'branch': '',
      'tag': ''
    }
    if 'branch' in item:
      dataItem['branch'] = item['branch']['S']
    if 'tag' in item:
      dataItem['tag'] = item['tag']['S']

    if (not tag and not branch) or branch == dataItem['branch'] or tag == dataItem['tag']:
      results.append(dataItem)

  return results

# Get all from the distribution table in a flattened dictionary dist={"t-1234": ["customer","customer"], "b-abcd": []}
def getAllInDistributionFlattened(tag = None, branch = None):
  dist = getAllInDistribution(tag, branch)
  results = {}
  for item in dist:
    if item['tag'] != '':
      if ('t-' + item['tag']) not in results:
        results['t-' + item['tag']] = []
      results['t-' + item['tag']].append(item['companyId'])
    elif item['branch'] != '':
      if ('b-' + item['branch']) not in results:
        results['b-' + item['branch']] = []
      results['b-' + item['branch']].append(item['companyId'])
  return results

# Update the distribution
def updateDistribution(companyIds, branch = '', tag = ''):
  deployConfig = config.getConfig()

  if type(companyIds) is not list:
    companyIds = [companyIds]

  dynamodb = boto3.resource('dynamodb', region_name=deployConfig['REGION'])
  items = []

  for companyId in companyIds:
    itemPayload = {'companyId': companyId}
    if tag and tag != '':
      itemPayload['tag'] = tag
    else:
      itemPayload['branch'] = branch
    items.append(itemPayload)

  table = dynamodb.Table(deployConfig['CUSTOMER_DEPLOY_DISTRIBUTION_TABLE'])

  with table.batch_writer() as writer:
    for item in items:
      writer.put_item(Item=item)

# Get the majority release tag/branch (useful when building a new customer)
def getMajorityBranch():
  dist = getAllInDistributionFlattened()
  # convert to list of dictionary value (also lists) lengths
  # e.g.
  # {"b-1234": ["c1", "c2"], "b-5678": ["c3", "c4", "c5"]}
  # ->
  # [2, 3]
  # ->
  # max of list is 3, index of 3 is 1
  # ->
  # majority branch is then b-5678 (index 1)
  builds = []
  lengths = []
  for build in dist:
    builds.append(build)
    lengths.append(len(dist[build]))
  try:
    maxVal = max(lengths)
    majorityIndex = lengths.index(maxVal)
    majorityBranch = builds[majorityIndex]
    return majorityBranch[2:]
  except e:
    return 'master'
`;

export const codeSampleDeploy = `# Deploy threads of workers, 1 for each target. These workers handle all of the tasks needed for releasing code and/or running migrations.
def deployWorkers():
  print('NOTE: Deploying workers')
  utilityMachines = machines.getUtilityMachines()
  appWebMachines = machines.getMachines()
  qaMachines = machines.getQaMachines()

  threads = []
  machineCmd = buildWorkerCommand(False)

  if doQa:
    if doMigrate:
      machineCmd = buildWorkerCommand(doMigrate)
    for qaMachine in qaMachines:
      cmd = machineCmd ' ' + qaMachine
      deployWorker(cmd)
  else:
    # deploy to utility machines
    firstUtilityMachine = utilityMachines[0]
    restUtilityMachines = utilityMachines

    if doMigrate:
      # run migrate - this is a blocking, synchronous routine
      utilityDeployCmd = buildWorkerCommand(doMigrate)
      cmd = utilityDeployCmd + ' ' + firstUtilityMachine
      deployWorker(cmd)
      restUtilityMachines = utilityMachines[1:]

    if doMigrateOnly:
      print('NOTE: Ran with --migrate-only. Skipping regular deploy.')
    else:
      # deploy to remaining utility machines
      for utilityMachine in restUtilityMachines:
        utilityDeployCmd = machineCmd
        cmd = utilityDeployCmd + ' ' + utilityMachine
        t = Thread(target=deployWorker, args=(cmd,))
        t.start()
        threads.append(t)

      # deploy to the app web servers
      for appWebMachine in appWebMachines:
        cmd = machineCmd + ' ' + appWebMachine
        t = Thread(target=deployWorker, args=(cmd,))
        t.start()
        threads.append(t)

      # remaining util machines plus web servers are async deployed
      for t in threads:
        t.join()
`;

export const codeSampleUnusedCheckouts = `#!/usr/bin/sh

# description:
# Removes checkout directories which are not present in the client symlink list

# config vars
CHECKOUT_DIR=/var/www/app/checkout/*
RUNTIME_DIR=/var/www/app/runtime/*

#runtime vars
clientLinkTargets=()

for dir in $RUNTIME_DIR
do
  dir=$(readlink -f $dir)
  dir="\${dir##*/}"
  clientLinkTargets+=($dir)
done

for dir in $CHECKOUT_DIR
do
  dir="\${dir##*/}"
  if [[ ! " \${clientLinkTargets[*]} " =~ " \${dir} "  ]]; then
    dirForRemoval="/var/www/app/checkout/$dir"
    if [ $dir != "master" ] && [ $dirForRemoval != "/var/www/app/checkout/" ] && [ -d "$dirForRemoval" ]; then
      echo "NOTE: $dir is not in use. Removing."
      rm -rf "$dirForRemoval"
    fi
  fi
done
`;

export const customDeploymentMeta: StudyMeta = {
  title: "Custom Deployment",
  name: "custom-deployment",
  path: "/custom-deployment",
};

const CustomDeployment: React.FC = () => {
  React.useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, []);

  return (
    <div id={customDeploymentMeta.name}>
      <p>
        One of our biggest products was in between phases, with a slow
        improvement to the infrastructure on-going and overall in the process of
        modernization. This is a SaaS ERP, and while we had implemented
        automated testing with modern libraries, our architecture did not allow
        for pipelining customer builds, duplications, deployments, etc, using
        modern tooling.
      </p>
      <p>
        The legacy system responsible for doing this work was written in a
        series of Python scripts, but this suffered from duplicated code and
        scattered logic. At best, it was helping the business limp by and there
        were serious problems, including but not limited to:
      </p>
      <ul>
        <li>
          Extremely slow customer builds. A customer build (file copy, database
          instantiation, metadata insertion, etc) would customarily take 10-15
          minutes. This meant there was no way to allow for near-instantaneous
          creation via a mobile app or website. Customers would “wait to hear
          back” when their instance was ready.
        </li>
        <li>
          Painfully slow customer deployments. Releasing updated code to
          thousands of customers would take anywhere from 6 to 48 hours,
          depending on migration & data imports in the release tag.
        </li>
        <li>
          Awkward customer duplications. Since the customer was a business, they
          would often sell their business to another, or start up a new branch
          somewhere. They would request their instance be copied. The tools for
          this meant after the copy, we'd have to spend upwards of a day
          customizing the data via custom written SQL.
        </li>
      </ul>
      <p>
        With these problems, we were tasked with updating the toolkit to run
        better on our recently updated hardware & software layout.
      </p>
      <div className={"font-bold"}>Business Requirements:</div>
      <ul>
        <li>
          Reduce build time to &lt;= 60 seconds, allowing for customers to
          request accounts and have them ready within a reasonable waiting
          period
        </li>
        <li>
          Reduce deploy time to &lt;= 20 minutes, with the maximum time allowed
          for larger migrations
        </li>
        <li>Hotfix deploy time should target &lt;= 5 minutes</li>
        <li>
          Allow for broad or isolated releases with a one-to-many pattern for
          branches/tags to customers. Perhaps 95% of customers are on release
          v2.1.0, but a segment of franchise customers need to be kept on v2.0.5
          to respect their business operations' prep for the new features in
          v2.1.0.
        </li>
        <li>
          Reduce complexity and manual data work involved in customer data
          duplication by adding pre-built templates for commonly requested data
          operations, such as excluding certain buckets of data or including
          extra relational tables. This can reduce hours spent on this type of
          customer request by 99%.
        </li>
        <li>Provide a private API for issuing RPC</li>
        <li>
          Provide a private web UI/UX for issuing builds, deployments, & clones.
          This should utilize the API.
        </li>
        <li>
          Must provide Salesforce with notifications of deployments, builds, &
          clones
        </li>
        <li>
          Must provide support platform with notifications of deployments,
          builds, & clones
        </li>
      </ul>
      <div className={"font-bold"}>Design Considerations:</div>
      <ul>
        <li>
          Create a microservice for set/get operations which will store which
          customers are on which branches/tags. This will store the distribution
          of deployments.
        </li>
        <li>
          Document the current Python scripts by detailing their purpose, then
          create a series of DRY optimized Python classes/functions that can be
          used as the foundation for the new processes
        </li>
        <li>
          Create the entrypoint scripts: deploy.py, build.py, & clone.py, which
          will import and leverage shared functionality
        </li>
        <li>
          Use create-react-app and serverless to construct the API and web UI/UX
        </li>
        <li>
          Migrations & data importation should happen in chronological order
          before the new code is deployed. They should be run from a queue with
          N threads processing in concurrency to maximize resources & minimize
          runtime.
        </li>
        <li>
          Code copy from a target branch/tag should be done via shallow checkout
          & rsync'd over to a checkout directory. The checkout directory should
          be automatically cleaned every N days to remove unused checkouts.
        </li>
        <li>
          Builds & clones should use similar threading power as the deployment
          process, and database copies should be done in-place rather than
          shuffling them to/from an external service
        </li>
        <li>Leverage ngrok for incoming SNS events</li>
      </ul>
      <div>
        <span className={"font-bold"}>Developer team size:</span> 2 (1
        fullstack, 1 devops)
      </div>
      <div>
        <span className={"font-bold"}>Time to market:</span> 60 days (4 sprints)
      </div>
      <PhotoProvider>
        <PhotoView src={"images/diagram_custom_deployment.png"}>
          <img
            src={"images/diagram_custom_deployment.png"}
            alt={"Custom Deployment Design Schematic"}
            className={"object-fit w-screen"}
          />
        </PhotoView>
      </PhotoProvider>

      <div className={"italic text-md"}>
        Note: This is a best attempt recreation to protect IP
      </div>

      <div className={"font-bold"}>distribution.py</div>
      <SyntaxHighlighter
        language="python"
        style={docco}
        showLineNumbers={true}
        showInlineLineNumbers={true}
        className={"mt-0"}
      >
        {codeSampleDistribution}
      </SyntaxHighlighter>

      <div className={"font-bold"}>deploy.py</div>
      <SyntaxHighlighter
        language="python"
        style={docco}
        showLineNumbers={true}
        showInlineLineNumbers={true}
        className={"mt-0"}
      >
        {codeSampleDistribution}
      </SyntaxHighlighter>

      <div className={"font-bold"}>clean-unused-checkouts.sh</div>
      <SyntaxHighlighter
        language="bash"
        style={docco}
        showLineNumbers={true}
        showInlineLineNumbers={true}
        className={"mt-0"}
      >
        {codeSampleUnusedCheckouts}
      </SyntaxHighlighter>
    </div>
  );
};

export default CustomDeployment;
