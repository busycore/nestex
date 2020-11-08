interface IFileUploadProvider {
  upload(file: any): Promise<void>;
}
