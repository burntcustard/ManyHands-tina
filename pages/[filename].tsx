/* Disable no-explicity-any because it's tina's code not ours */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { Menu } from "../components/menu";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout data={data.global as any}>
      <Menu/>
      <Blocks {...data.page} events={props.events} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.md`,
  });

  const pageQueryStuff = await client.queries.pageQuery();

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      events: pageQueryStuff.data.eventConnection.edges,
    },
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
