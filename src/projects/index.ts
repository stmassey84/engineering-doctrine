import PayAtClose, { payAtCloseMeta } from "./PayAtClose";
import CloudInspect, { cloudInspectMeta } from "./CloudInspect";
import SecureParamFetch, { secureParamFetchMeta } from "./SecureParamFetch";
import FileFetchService, { fileFetchServiceMeta } from "./FileFetchService";
import BatchPhotoDownload, { batchPhotoDownloadMeta } from "./BatchPhotoDownload";

const studies = {
  PayAtClose,
  CloudInspect,
  SecureParamFetch,
  FileFetchService,
  BatchPhotoDownload,
};

export const studiesMetaData = {
  payAtCloseMeta,
  cloudInspectMeta,
  secureParamFetchMeta,
  fileFetchServiceMeta,
  batchPhotoDownloadMeta,
};

export default studies;
