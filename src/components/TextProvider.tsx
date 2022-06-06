import { FunctionComponent, useState } from 'react';
import BaseButton from './BaseButton';
import InputComponent from './InputComponent';
import BaseSwitch from './switch/BaseSwitch';
import BaseTextInput from './text/BaseTextInput';

interface TextProviderProps {}

const TextProvider: FunctionComponent<TextProviderProps> = () => {
  const [isFile, setIsFile] = useState(false);
  const [readText, setReadText] = useState<string | ArrayBuffer>('');
  const [fileData, setFileData] = useState<File>(null);
  const [email, setEmail] = useState<string>('');
  let formData = new FormData();

  const onClickHandler = () => {
    formData.append('email', email);
    formData.append('file', fileData);
    if (isFile) {
      try {
        fetch('http://localhost:5000/analyze', {
          method: 'POST',
          // mode: 'cors',
          // headers: { 'Content-Type': 'multipart/form-data' },
          body: formData,
        }).then((response) => console.log(response));
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        fetch('http://localhost:5000/analyze', {
          method: 'POST',
          // mode: 'cors',
          // headers: { 'Content-Type': 'multipart/form-data' },
          body: JSON.stringify({
            email: email,
          }),
        }).then((response) => console.log(response));
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <form className='w-full max-w-sm'>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
            Email
          </label>
        </div>
        <div className='md:w-2/3'>
          <BaseTextInput
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'></div>
        <div className='md:w-1/3'>
          <BaseSwitch
            label='File'
            value={isFile}
            onChange={() => setIsFile(!isFile)}
          />
        </div>
      </div>
      <div className='md:flex align-items-start md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
            Source
          </label>
        </div>
        <div className='md:w-2/3'>
          {isFile ? (
            <InputComponent inputState={fileData} setInputState={setFileData} />
          ) : (
            <BaseTextInput
              type='textarea'
              onChange={(e) => setReadText(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className='md:flex md:items-center'>
        <div className='md:w-2/3'></div>
        <div className='md:w-1/3'>
          <BaseButton text={'Analyze'} onClick={onClickHandler} />
        </div>
      </div>
    </form>
  );
};

export default TextProvider;
