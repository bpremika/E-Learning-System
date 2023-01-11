import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';


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
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        {/* Modal content */}
      </Modal>

      <Group position="center" style={{position: 'relative', right: 45}}>
        <Button onClick={() => setOpened(true)}>Edit</Button>
      </Group>
    </>
  );
}