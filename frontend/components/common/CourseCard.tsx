import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "../../styles/card.module.css";

interface Props {
    imgurl: string;
    name: string;
    description: string;
    id: Number;
}

export default function CourseCard(data: Props) {
    // const [join, setJoin] = useState<string>("Home");
    // useEffect(() => {
    //   `localhost:3000/${join}`
    // }, [join]);

    const router = useRouter();

    return (
        <>
            <Card
                shadow="sm"
                p="lg"
                radius="md"
                m="sm"
                withBorder
                w="300px"
                component="a"
                href={`Courses/${data.id}`}
            >
                <Card.Section>
                    <Image src={data.imgurl} height={150} alt="subject" />
                </Card.Section>
                <div className="w-full">
                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>{data.name}</Text>
                    </Group>
                </div>

                <Text size="sm" color="dimmed" w="full" truncate lineClamp={3}>
                    {data.description}
                </Text>
            </Card>
        </>
    );
}
