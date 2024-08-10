import React, { useState } from 'react';
import { Upload, Image, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError'; // Adjust the path as needed
import '../styles.css'; // Adjust the path as needed

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const FileUpload = ({ name, label,maxCount, ...rest }) => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <Button style={{ border: 0, background: 'none', }} icon={<PlusOutlined />} > Upload </Button>
  );

  return (
    <div className="form-control formik-input mt-3 py-2">
      <Field name={name}>
        {({ field, form }) => (
          <>
            <Upload
              action="https://example.com/upload" // Replace with your upload URL
              listType="picture-card"
              fileList={fileList}
              maxCount={maxCount}
              onPreview={handlePreview}
              onChange={({ fileList: newFileList }) => {
                setFileList(newFileList);
                form.setFieldValue(name, newFileList);
              }}
              {...rest}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
            <ErrorMessage name={name} component={TextError} />
          </>
        )}
      </Field>
    </div>
  );
};

export default FileUpload;
