export default {
  name: 'insight',
  title: 'Insight',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'snippet',
      title: 'Snippet',
      type: 'text',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
        {
      name: 'type',
      title: 'type',
      type: 'text',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Article', value: 'Article' },
          { title: 'Report', value: 'Report' },
          { title: 'Insight', value: 'Insight' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.unique(),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
     {
      name: 'pages',
      title: 'pages',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'commercial',
      title: 'commercial',
      type: 'boolean',
      initialValue: false,
    },
        {
      name: 'safety',
      title: 'safety',
      type: 'boolean',
      initialValue: false,
    },
            {
      name: 'ppm',
      title: 'ppm',
      type: 'boolean',
      initialValue: false,
    },
     {
      name: 'access',
      title: 'access',
      type: 'boolean',
      initialValue: false,
    },
         {
      name: 'esg',
      title: 'esg',
      type: 'boolean',
      initialValue: false,
    },
             {
      name: 'space',
      title: 'space',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'management',
      title: 'management',
      type: 'boolean',
      initialValue: false,
    },
        {
      name: 'occupancy',
      title: 'occupancy',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'vendor',
      title: 'vendor',
      type: 'boolean',
      initialValue: false,
    },
    {
  name: 'pdfFile',
  title: 'PDF File',
  type: 'file',
  options: {
    accept: '.pdf'
  }
},


  ],
};


