import { Table } from '@mantine/core';
import { useEffect, useState } from 'react';
import EditText from './EditText';

interface Element{
    id: number;
    categoryVideo: string;
    name: string;
    videoUrl: string;
    // edit: boolean
}

interface Props{
    elememts: Array<Element>

}

export default function VideoTable(data: Props) {
    const [isOnEdit, setOnEdit] = useState(false);
    useEffect(()=> {
        console.log("on edit")
    }, [isOnEdit]);

    const rows = data.elememts.map((element: any) => (
    <tr key={element.name}>
      <td>{element.id}</td>
      <td>{element.categoryVideo}</td>
      <td>{element.name}</td>
      <td>{element.videoUrl}</td>
      <td>
        <EditText 
        id={element.id}
        categoryVideo={element.categoryVideo}
        name={element.name}
        videoUrl={element.videoUrl}></EditText>
      </td>
    </tr>
  ));

  return (
    <div style={{width: 747, height:232, overflowX: 'hidden', overflowY: 'scroll'}}>
    <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>Category Video</th>
          <th>Name</th>
          <th>Video URL</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    </div>
  );
}