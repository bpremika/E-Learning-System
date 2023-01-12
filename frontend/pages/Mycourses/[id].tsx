const StudentCourses = () => {
    return <div>Hello StudentCourses</div>;
};

export async function getStaticPaths() {
    const postIds = await getPostIds();
    const paths = postIds.map((id) => ({
        params: { id },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps(context: any) {
    console.log(context);
    return {
        props: {}, // will be passed to the page component as props
    };
}
export default StudentCourses;
