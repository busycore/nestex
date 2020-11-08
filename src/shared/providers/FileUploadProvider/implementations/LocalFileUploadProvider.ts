import { Injectable, Scope } from '@nestjs/common';

//Makes it Injectable and make it a singleton
@Injectable({ scope: Scope.DEFAULT })
export default class LocalFileUploadProvider implements IFileUploadProvider {
  async upload(file: any): Promise<void> {
    console.log(file, 'Handled by local provider');
  }
}
