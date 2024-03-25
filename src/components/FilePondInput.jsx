/** Import FilePond **/
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

/** Register the plugins **/
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

const FilePondInput = ({ refData ,file }) => {
  // refData.current.addFile(file)
  return (
    <FilePond
      credits={false}
      required={true}
      acceptedFileTypes={["image/jpeg", "image/png", "image/gif"]}
      labelFileTypeNotAllowed={"Unsupported File Type"}
      fileValidateTypeLabelExpectedTypes={"Expected formats: .jpeg, .png, .gif"}
      maxFileSize={"5MB"}
      ref={refData}
      // addFile={file}
    />
  );
};

export default FilePondInput;
