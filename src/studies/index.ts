import PayAtClose, { payAtCloseMeta } from "./PayAtClose";
import CloudInspect, { cloudInspectMeta } from "./CloudInspect";
import SecureParamFetch, { secureParamFetchMeta } from "./SecureParamFetch";
import FileFetchService, { fileFetchServiceMeta } from "./FileFetchService";
import BatchPhotoDownload, {
  batchPhotoDownloadMeta,
} from "./BatchPhotoDownload";
import CustomDeployment, { customDeploymentMeta } from "./CustomDeployment";

const studies = {
  PayAtClose,
  CloudInspect,
  SecureParamFetch,
  FileFetchService,
  BatchPhotoDownload,
  CustomDeployment,
};

export const studiesMetaData = {
  payAtCloseMeta,
  cloudInspectMeta,
  secureParamFetchMeta,
  fileFetchServiceMeta,
  batchPhotoDownloadMeta,
  customDeploymentMeta,
};

export default studies;
