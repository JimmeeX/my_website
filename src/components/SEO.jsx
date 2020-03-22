import React from 'react';
import Helmet from 'react-helmet';

import metadata from '../data/metadata';

const SEO = () => {
  const { title, description, author, lang, url } = metadata;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${description}`}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          name: `author`,
          content: author,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ]}
    />
  );
};

export default SEO;
