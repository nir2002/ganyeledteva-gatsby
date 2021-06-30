import React from "react";
import Page from "~src/components/Page/Page";
import PageHeader from "~src/components/Page/PageHeader";
import SEO from "~src/components/SEO";
// import tadmitVideo from "~static/assets/vids/dummyvid.mp4";
import { useStaticQuery, graphql } from "gatsby";
import TextTitle from "../../TextTitle";

export default function WorkInGan() {
  const data = useStaticQuery(graphql`
    query workInGanAndteamImagesQuery {
      teamMdx: allMdx(filter: { fields: { dir: { eq: "team" } } }) {
        edges {
          node {
            frontmatter {
              img
              title
            }
          }
        }
      }
      workInGanMdx: allMdx(filter: { fields: { dir: { eq: "work-in-gan" } } }) {
        edges {
          node {
            fields {
              dir
            }
            frontmatter {
              title
              subtitle
              tadmitVideo
            }
          }
        }
      }
    }
  `);

  const teamImagesEdges = data.teamMdx.edges;
  let teamImages = teamImagesEdges.map((imgEdge) => ({
    src: imgEdge.node.frontmatter.img,
    alt: imgEdge.node.frontmatter.title,
  }));

  const workInGanMdxData = data.workInGanMdx.edges[0].node;
  const { title, subtitle, tadmitVideo } = workInGanMdxData.frontmatter;

  const { dir: workINGanDirName } = workInGanMdxData.fields;

  const pageSEOData = {
    title: title,
    description: undefined,
    image: undefined,
    pagePath: workINGanDirName,
  };

  return (
    <Page>
      <SEO pageSEOData={pageSEOData} />
      <Page.Header>
        <PageHeader
          title={title}
          subtitle={subtitle}
          backgroundColorClass="bg-gradient-to-r from-blue-gan-page-header1 to-blue-gan-page-header2"
          backgroundPatternClass="bg-patt1"
        />
      </Page.Header>
      <Page.Main>
        <div className="my-16">
          <TextTitle
            title="לעבוד איתנו be like:"
            className="text-center py-10"
          />
          <video className="m-auto w-2/3 h-2/3 " controls>
            <source src={tadmitVideo} type="video/mp4" />
          </video>
        </div>
        <div className="m-auto pb-20 w-5/6">
          <TextTitle title="הצוות המנצח שלנו" className="text-center py-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {teamImages.map((img) => (
              <img src={img.src} alt={img.alt} />
            ))}
          </div>
        </div>
      </Page.Main>
    </Page>
  );
}
