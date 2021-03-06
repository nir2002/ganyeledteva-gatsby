import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import PageHeader from '../components/Page/PageHeader';
import Page from '../components/Page/Page';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import TextTitle from './../components/TextTitle/TextTitle';
import { getVideoIdFromYoutubeUrl } from '../utils';
const headerMdFileName = config.ganMainPageDataMdFileName;
const recommendationFileName = 'recommendations';
const defaultFacebookRecommendationUrl =
  'https://www.facebook.com/yaldeyhateva/reviews/?ref=page_internal';
const defaultGoogleRecommendationUrl =
  'https://www.google.com/search?q=%D7%99%D7%9C%D7%93%D7%99+%D7%94%D7%98%D7%91%D7%A2+%D7%94%D7%93%D7%9E%D7%95%D7%A7%D7%A8%D7%98%D7%99&rlz=1C1SQJL_iwIL939IL939&oq=%D7%99%D7%9C%D7%93%D7%99+%D7%94%D7%98%D7%91&aqs=chrome.0.69i59j69i57j35i39j69i61l3j69i65l2.3577j0j7&sourceid=chrome&ie=UTF-8#lrd=0x151d4ba3aaaaaaab:0xaf0631a83792f010,1,,,';

export default function GanSectionTemplate({ data, pageContext }) {
  const { mdx: activeGanSection, allMdx: ganSections } = data;
  const sectionsData = [];
  ganSections.edges.forEach((sectionEdge) => {
    sectionsData.push({
      filename: sectionEdge.node.fields.filename,
      title: sectionEdge.node.frontmatter.title,
      path: sectionEdge.node.fields.slug,
    });
  });

  const { slug } = pageContext;
  const sectionsNode = activeGanSection;
  const section = sectionsNode.frontmatter;
  const {
    images,
    video_title: videoTitle,
    youtubeVideoUrl,
    title,
    foodMenuFileLink,
    foodMenuLinkTitle,
    facebook_recommendation_url: facebookRecommendationUrl,
    google_recommendation_url: googleRecommendationUrl,
  } = section;
  if (!section.id) {
    section.id = slug;
  }

  const recommendationButtonsData = [
    {
      title: 'ממליצים עלינו בגוגל',
      href: googleRecommendationUrl || defaultGoogleRecommendationUrl,
    },
    {
      title: 'ממליצים עלינו בפייסבוק',
      href: facebookRecommendationUrl || defaultFacebookRecommendationUrl,
    },
  ];

  const postSEOData = { postPath: slug, postNode: sectionsNode };
  const isRecommendationSection =
    sectionsNode.fields.filename === recommendationFileName;

  return (
    <Layout>
      <Helmet>
        <title>{`${title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postSEOData={postSEOData} />
      <Page>
        <Page.Header className="border-b-8 border-yellow-gan-section-header-border">
          <PageHeader
            title={title}
            backgroundColorClass="bg-gradient-to-r from-yellow-gan-section-header to-green-gan-section-header"
            backgroundPatternClass="bg-patt1"
          />
        </Page.Header>
        <Page.Main>
          <div className="md:flex justify-center md:pb-20">
            {isRecommendationSection ? (
              <div className="block md:hidden ">
                <RecommendationButtons
                  recommendationButtonsData={recommendationButtonsData}
                />
              </div>
            ) : null}
            <div className="mx-10 md:w-3/7 md:ml-10">
              <MDXRenderer>{sectionsNode.body}</MDXRenderer>
            </div>
            <div className="md:w-2/7 mt-4 ">
              {isRecommendationSection
                ? null
                : images?.map((img, index) => (
                    <div
                      key={`${(img.src, index)}`}
                      className="my-5 lg:mx-5 shadow-img"
                    >
                      <img src={img.src} alt={img.alt} />
                    </div>
                  ))}
              {isRecommendationSection ? (
                <div className="hidden md:block">
                  <RecommendationButtons
                    recommendationButtonsData={recommendationButtonsData}
                  />
                </div>
              ) : null}
            </div>
          </div>
          {youtubeVideoUrl ? (
            <>
              {videoTitle ? (
                <TextTitle title={videoTitle} className="text-center" />
              ) : null}
              <iframe
                className="m-auto h-auto py-10 w-5/6 sm:h-screen"
                src={`https://www.youtube.com/embed/${getVideoIdFromYoutubeUrl(
                  youtubeVideoUrl
                )}?autoplay=1&loop=1&rel=0&modestbranding=1&autohide=1&showinfo=0&mute=1`}
                title={videoTitle || ''}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </>
          ) : null}
          {foodMenuFileLink ? (
            <div className="m-auto md:w-1/5 text-center">
              <a href={foodMenuFileLink} target="_blank">
                <div className="inline-block my-4 px-2 py-1 rounded-full w-11/12 sm:w-1/2 text-center border-2 border-black hover:bg-red-link hover:text-white">
                  {foodMenuLinkTitle ? foodMenuLinkTitle : 'לחצו כאן'}
                </div>
              </a>
            </div>
          ) : null}
          <BottomNavMenu
            sectionsData={sectionsData}
            activeSectionTitle={title}
          />
        </Page.Main>
      </Page>
    </Layout>
  );
}

const BottomNavMenu = ({ sectionsData, activeSectionTitle }) => {
  const activeSectionStyle = 'text-purple-light-border opacity-40';
  const nonActiveSectionStyle = 'hover:text-purple-border';
  return (
    <div className="border-t-2 pt-4 mt-6 md:w-5/7  m-auto">
      <div className="text-red-link text-3xl">עוד בנושא...</div>
      <div className="text-2xl">
        {sectionsData.map((section, index) => {
          if (section.filename !== headerMdFileName) {
            return (
              <div
                key={index}
                className={`my-1 ${
                  section.title === activeSectionTitle
                    ? activeSectionStyle
                    : nonActiveSectionStyle
                }`}
              >
                <Link to={section.path}>> {section.title}</Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

const RecommendationButtons = ({ recommendationButtonsData }) => (
  <div className="flex flex-col justify-center md:sticky top-1/2 w-2/5  m-auto lg:mr-14">
    {recommendationButtonsData.map(({ title, href }) => (
      <RecommendationButton title={title} href={href} />
    ))}
  </div>
);

const RecommendationButton = (props) => (
  <a
    {...props}
    target="_blank"
    className={`my-4 inline-block rounded-full text-base text-center py-1 px-3 border-2 border-black bg-red-link text-white ${props.className}`}
  >
    {props.title}
  </a>
);

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ganPostBySlugAndGanPostsListQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        google_recommendation_url
        facebook_recommendation_url
        images {
          alt
          src
        }
        video_title
        youtubeVideoUrl
        foodMenuFileLink
        foodMenuLinkTitle
      }
      fields {
        slug
        filename
      }
    }
    allMdx(filter: { fields: { dir: { eq: "gan" } } }) {
      edges {
        node {
          fields {
            slug
            filename
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
