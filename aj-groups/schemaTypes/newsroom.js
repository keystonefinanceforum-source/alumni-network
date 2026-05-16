export default {
  name: 'newsroom',
  title: 'Newsroom',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
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
      name: 'Static',
      title: 'Static event',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'Event',
      title: 'Event',
      type: 'boolean',
      initialValue: false,
    },
        {
      name: 'index',
      title: 'index',
      type: 'boolean',
      initialValue: false,
    },
    {
          name: 'link',
      title: 'Link',
      type: 'url'
    },
        {
          name: 'reports',
      title: 'annual-reports',
      type: 'boolean'
    },
     {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'PDF Report', value: 'PDF Report' },
          { title: 'Report', value: 'Report' },
          { title: 'Insight', value: 'Insight' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
}
