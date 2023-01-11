import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import MyTextInput from './MyTextInput';

interface Element{
    id: number;
    categoryVideo: string;
    name: string;
    videoUrl: string;
}



export default function EditText(Props: Element) {
    const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal size="sm"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit"
      >
        <MyTextInput title="Category Video" draft=''/>
        <MyTextInput title="Name" draft=''/>
        <MyTextInput title="Video URL" draft=''/>
        <div className="w-full flex flex-row-reverse">
        <Button style={{marginTop:"20px"}} onClick={() => setOpened(false)}>Apply</Button>
        </div>

      </Modal>

      <Group position="center" style={{position: 'relative', right: 20}}>
        <Button onClick={() => setOpened(true)}>Edit</Button>
      </Group>
    </>
  );
}