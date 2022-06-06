import { FunctionComponent } from 'react';

interface InputComponentProps {
  inputState: File;
  setInputState: (value: File) => void;
}

const InputComponent: FunctionComponent<InputComponentProps> = ({
  setInputState,
}) => {
  let fileReader: FileReader;
  fileReader = new FileReader();
  // let formData = new FormData();

  //   const handleFileRead = (e) => {
  //     const content = fileReader;
  //     console.log(content);
  //     //setInputState(content);
  //     // … do something with the 'content' …
  //   };

  const handleFileChosen = (file: File) => {
    fileReader = new FileReader();
    console.log(file, fileReader);
    // formData.append('file', file);
    setInputState(file);
    //fileReader.onloadend = handleFileRead;
    //fileReader.readAsText(file);
  };
  return (
    <div>
      <input
        type='file'
        id='file'
        className='block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100'
        accept='.txt,.pdf'
        onChange={(e) => handleFileChosen(e.target.files[0])}
      />
    </div>
  );
};

export default InputComponent;
