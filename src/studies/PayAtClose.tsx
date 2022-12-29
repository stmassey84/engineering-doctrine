import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { StudyMeta } from "./types";

export const codeSample = `const bodySchema = {
  type: 'object',
  properties: {
    client: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
      },
    },
    workflow: {
      type: 'object',
      properties: {
        name: 'string',
        props: {
          type: 'object',
          patternProperties: {
            '^.*$': {
              anyOf: [
                {type: 'string'}
              ]
            }
          },
          additionalProperties: false
        }
      }
    },
  },
} as const;

enum WorkFlows {
  EMAIL = 'email',
  SMS = 'sms',
  RPC = 'rpc'
}

type EmailWorkFlowProps = {
  sendGridTemplateId: string
}

type WorkFlow = {
  name: WorkFlows,
  props: EmailWorkFlowProps /* ... | SMSWorkFlowProps | RPCWorkFlowProps */
}

type Client = {
  id: string,
  name: string,
  email: string,
}

interface EventBody {
  client: Client,
  workflow: WorkFlow
}

const SENDGRID_TEMPLATES = [
  'm2a94jk09',
  '4dcl03kaa',
  'm5b20jkk4'
];

/**
 * triggerWorkFlow
 * @param event { body: any }
 * @returns @{ statusCode: number, body: any }
 * @description:
 * This is a handler wrapped in middleware (middyfy) with JSON schema validation & typing on the APIGatewayProxyEvent.
 * The work this function can potentially do is to trigger workflow events for:
 * 1. Sending Email via internal SendGrid API
 * 2. Sending a text message via internal Twilio API
 * 3. Invoking a Remote Procedure Call / API call, typically to an internal service API
 */
const triggerWorkFlow: Handler<FromSchema<typeof bodySchema>> = middyfy(
  ({ body: { client, workflow }: EventBody }) => {

    // input validation for workflow & client
    if (!workflow || !(workflow in WorkFlows)) {
      return {
        statusCode: 422,
        body: {
          status: Status.ERROR,
          message: 'Invalid workflow supplied in request body'
        }
      }
    }

    if (!client || !client.id || !client.email) {
      return {
        statusCode: 422,
        body: {
          status: Status.ERROR,
          message: 'Invalid client supplied in request body'
        }
      }
    }

    // clear to process the workflow request
    switch (workflow.name) {
      case (WorkFlows.EMAIL):
        // logging pretty verbose for the sake of example, should reduce logging to only what is necessary for production
        if (SENDGRID_TEMPLATES.indexOf(workflow.props.sendGridTemplateId) === false) {
          return {
            statusCode: 404,
            body: {
              status: Status.ERROR,
              message: 'Non-existent sendGridTemplateId provided in request body'
            }
          }
        }

        logger.info({ action: 'preparing', message: 'preparing to invoke workflow', workflow });

        let receipt;

        try {
          receipt = await InternalSendGridService.queueForSend(workflow.props.sendGridTemplateId, client.email, client.name);
        } catch (e: Error) {
          logger.error({ action: 'running', message: 'failed to invoke workflow', workflow, e });
          return {
            statusCode: e.statusCode,
            body: {
              status: Status.ERROR,
              message: 'Failed to invoke workflow, see error details',
              error: process.env.NODE_ENV === 'dev' ? e : 'There was a problem sending the email'
            }
          };
        }

        logger.info({ action: 'done', message: 'workflow complete', workflow, receipt });

        return {
          statusCode: 200,
          body: {
            status: Status.OK,
            message: 'Successfully invoked workflow, see receipt details',
            receipt
          }
        };
        break;
      //case(WorkFlow.SMS):
      //case(WorkFlow.RPC):
    }


  },
  bodySchema
);

export default triggerWorkFlow;
`;

export const payAtCloseMeta: StudyMeta = {
  title: "Pay at Close",
  name: "pay-at-close",
  path: "/pay-at-close",
};

const PayAtClose: React.FC = () => {
  React.useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, []);

  return (
    <div id={payAtCloseMeta.name}>
      <p>
        A paid SaaS module which enables home inspectors to allow their clients
        (home buyers) to defer payment until they close. A transaction within
        this system has the potential to trigger money movement via credit card
        payments, as well as triggering invoicing to title/closing companies.
        Because of this sensitivity, the system has to be redundant, lossless,
        and processed via dequeue reduction. This is achieved by designing the
        overall flow of transactions to be event driven, with FIFO SQS queues
        providing a high fidelity of message reception.
      </p>
      <div className={"font-bold"}>Business Requirements:</div>
      <ul>
        <li>Integrates directly into ERP</li>
        <li>
          Charges an additional $N on monthly invoice for each successful
          transaction
        </li>
        <li>
          Ability to trace a transaction from where it begins (client) to where
          it ends (closing or backup payment method)
        </li>
        <li>
          One transaction per order, but a transaction can be canceled and a new
          one created for the same order
        </li>
        <li>Automatically offered to clients when they go to pay online</li>
        <li>
          Functionality to exclude offering it for certain types of services
        </li>
        <li>Admin Portal with tracking, logs, and transaction details</li>
      </ul>
      <div className={"font-bold"}>Design Considerations:</div>
      <ul>
        <li>Service oriented</li>
        <li>Bidirectional APIs</li>
        <li>Messages, representing transaction data, queued for processing</li>
        <li>Dequeue via lambda trigger</li>
        <li>Emit messages via SNS for workflow triggers</li>
        <li>DynamoDB storage, DAX cache</li>
      </ul>
      <div>
        <span className={"font-bold"}>Developer team size:</span> 3 (2
        fullstack, 1 frontend)
      </div>
      <div>
        <span className={"font-bold"}>Time to market:</span> 120 days (8~
        sprints)
      </div>
      <PhotoProvider>
        <PhotoView src={"images/diagram_pac.png"}>
          <img
            src={"images/diagram_pac.png"}
            alt={"Pay at Close Design Schematic"}
            className={"object-fit w-screen"}
          />
        </PhotoView>
      </PhotoProvider>

      <div className={"font-bold"}>workflows.ts</div>
      <div className={"italic text-md"}>
        Note: This is a best attempt recreation to protect IP
      </div>
      <SyntaxHighlighter
        language="typescript"
        style={docco}
        showLineNumbers={true}
        showInlineLineNumbers={true}
        className={"mt-0"}
      >
        {codeSample}
      </SyntaxHighlighter>
    </div>
  );
};

export default PayAtClose;
