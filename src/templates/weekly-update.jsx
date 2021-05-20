import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing/PostListing';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import Page from '../components/Page/Page';
import PageHeader from '../components/Page/PageHeader';
import { formatDate } from '../utils';
import Logo from "../components/Logo/Logo"


function WeeklyUpdate({ data }) {
  const postEdges = data.allMdx.edges;
  const postList = [];
  postEdges.forEach((postEdge) => {
    postList.push({
      path: postEdge.node.fields.slug,
      tags: postEdge.node.frontmatter.tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date,
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead,
      dir: postEdge.node.fields.dir
    });
  });

  const [firstPost, ...restPostList] = postList
  return (
    <Layout>
      <Helmet title={`העדכון השבועי | ${config.siteTitle}`} />
      <SEO />
      <Page>
        <PageHeader
          title='העדכון השבועי'
          subtitle='מתוך הכרה בחשיבות הקשר שבין המשולש- ילד/ה-בית-גן נשלח אליכם ההורים בכל סוף שבוע עדכון שבועי ובו אנו משתפות אתכם בחוויות המשותפות שלנו ממהלך השבוע, מעדכנות בפרטים חשובים ומאפשרות גם לכם להיות חלק מהעשייה בגן.'
          backgroundColorClass="bg-gradient-to-r from-greenHeader1weekly to-greenHeader2weekly"
          backgroundPatternClass="bg-patt3"
        >
        </PageHeader>
        <Page.Main>
          <div className='md:grid grid-cols-9 gap-2 mr-3'>
            <div className="col-span-9 h-6" />
            <div className='md:col-span-4 md:col-start-2'>
              <FirstPost firstPost={firstPost} />
            </div>
            <div className="hidden md:block col-span-4 h-60">
              <Logo className="h-5/6 mx-auto my-5" />
            </div>
            <div className="col-span-9 h-24" />
            <div className="md:col-span-6 md:col-start-2 border-r-4 border-purple mb-4">
              <h2 className="pr-5 my-2 ">עדכונים קודמים</h2>
            </div>
            <div className="md:col-span-7 md:col-start-2">
              <div className="flex flex-col md:grid grid-cols-4 gap-6 pb-12">
                {restPostList.map((post, index) => (
                  index < 8 && //render only 8 items
                  <PostItem date={post.date} title={post.title} fullPostUrl={post.path} />
                ))}
              </div>
            </div>
          </div>

        </Page.Main>
      </Page>
    </Layout>
  );
}

export default WeeklyUpdate;

const PostItem = ({ date, title, fullPostUrl }) => {
  return (
    <div className="w-2/3 md:w-11/12 border h-80 float-right">
      <div className="h-full border-transparent border-r-4 hover:border-purple">
        <Link to={fullPostUrl}>
          <div className='pr-4'>
            <p className='h-10 pt-3'>{formatDate(date)}</p>
            <h1 className='pb-10 text-3xl mb-10 h-40 pl-2'>{title}</h1>
            <div className="w-32 rounded-full py-1 px-3 border-2 border-black bg-red text-white " >המשך קריאה ></div>
          </div>
        </Link>
      </div>
    </div>
  )
}


const FirstPost = ({ firstPost }) => {
  return (
    <div className="border-r-4 border-purple py-5 h-full">
      <Link to={firstPost.path}>
        <div className="px-5">
          <p className='mb-4 pt-2'>{formatDate(firstPost.date)}</p>
          <h1 className='text-5xl mb-8'>{firstPost.title}</h1>
          <div className="w-32 rounded-full py-1 px-3 border-2 border-black bg-red text-white my-10" >המשך קריאה ></div>
        </div>
      </Link>
    </div>
  )
}


/* eslint no-undef: "off" */
export const pageQuery = graphql`
query LandingQuery {
  allMdx(sort: { fields: [frontmatter___date], order: DESC },filter: { fields: { dir: { eq: "weekly-update" }}}) {
      edges {
        node {
          fields {
            slug
            date
            dir
          }
          excerpt
          timeToRead
          frontmatter {
            title
            date
          }
          body
        }
      }
    }
  }
`;
