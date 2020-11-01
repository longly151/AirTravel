/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import {
  Container, QuickView, Header, Body, Text,
  FileViewButton } from '@components';
import FilePickerButton from '@components/Common/Button/FilePickerButton';

import fileData from './mock/fileData';

class FileExample extends PureComponent {
  uploadCallback = (url: string) => console.log('New File Url: ', url);

  renderFileItem = () => fileData.map((item: any, index: number) => (
    <FileViewButton
      data={item}
      key={index.toString()}
      // horizontal
    />
  ));

  render() {
    return (
      <Container>
        <Header backIcon title="File" shadow switchTheme />
        <Body scroll>
          <QuickView marginTop={15}>
            <Text type="header">Editable File</Text>
            <FilePickerButton
              title="Pick a File"
              folderPrefix="files"
              uploadCallback={this.uploadCallback}
            />
            <FilePickerButton
              title="Pick multiple files"
              folderPrefix="files"
              multiple
              uploadCallback={this.uploadCallback}
            />
          </QuickView>
          <QuickView style={{ marginVertical: 15 }}>
            <Text type="header">File View Button</Text>
            {this.renderFileItem()}
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default FileExample;
