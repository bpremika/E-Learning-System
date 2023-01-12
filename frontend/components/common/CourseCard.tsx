import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "../../styles/card.module.css";

interface Props {
    imgurl: string;
    name: string;
    description: string;
}

export default function CourseCard(data: Props) {
    // const [join, setJoin] = useState<string>("Home");
    // useEffect(() => {
    //   `localhost:3000/${join}`
    // }, [join]);

    const router = useRouter();

    return (
        <>
            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                    <Image src={data.imgurl} height={160} alt="subject" />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{data.name}</Text>
                    {/* <Badge color="pink" variant="light">
          On Sale
        </Badge> */}
                </Group>

                <Text size="sm" color="dimmed">
                    {data.description}
                </Text>

                <Button
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={() => router.push(data.name)}
                >
                    Details
                </Button>
            </Card>
        </>
    );
}
