// ========================================
// leadership.js (SANITY SCHEMA)
// ========================================

export default {
  name: 'leadership',
  title: 'Leadership',
  type: 'document',

  fields: [

    // ========================================
    // NAME
    // ========================================

    {
      name: 'name',
      title: 'Full Name',
      type: 'string',

      validation: Rule => Rule.required()
    },

    // ========================================
    // SLUG
    // ========================================

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',

      options: {
        source: 'name',
        maxLength: 96
      },

      validation: Rule => Rule.required()
    },

    // ========================================
    // POSITION
    // ========================================

    {
      name: 'position',
      title: 'Position',
      type: 'string',

      validation: Rule => Rule.required()
    },

    // ========================================
    // DIVISION
    // ========================================

    {
      name: 'division',
      title: 'Division',
      type: 'string',

      options: {
        list: [

          {
            title: 'M&A and Corporate Finance',
            value: 'M&A and Corporate Finance'
          },

          {
            title: 'Equity Research',
            value: 'Equity Research'
          },

          {
            title: 'Consulting',
            value: 'Consulting'
          },

          {
            title: 'Operations',
            value: 'Operations'
          },

          {
            title: 'Strategy',
            value: 'Strategy'
          }

        ]
      }
    },

    // ========================================
    // CATEGORY
    // ========================================

    {
      name: 'category',
      title: 'Leadership Category',
      type: 'string',

      options: {
        list: [

          {
            title: 'Co-ordinators',
            value: 'Co-ordinators'
          },

          {
            title: 'Partners',
            value: 'Partners'
          },

          {
            title: 'Associates',
            value: 'Associates'
          },

          {
            title: 'Senior Analysts',
            value: 'Senior Analysts'
          },

          {
            title: 'Operations Team',
            value: 'Operations Team'
          }

        ]
      },

      validation: Rule => Rule.required()
    },

    // ========================================
    // PHOTO
    // ========================================

    {
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',

      options: {
        hotspot: true
      },

      validation: Rule => Rule.required()
    },

    // ========================================
    // SHORT BIO
    // ========================================

    {
      name: 'bio',
      title: 'Short Bio',
      type: 'text',

      rows: 3
    },

    // ========================================
    // LONG BIO
    // ========================================

    {
      name: 'longBio',
      title: 'Long Bio',
      type: 'text',

      rows: 10
    },

    // ========================================
    // LINKEDIN
    // ========================================

    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url'
    },

    // ========================================
    // EMAIL
    // ========================================

    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },

    // ========================================
    // ORDER
    // ========================================

    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }

  ],

  preview: {

    select: {
      title: 'name',
      subtitle: 'position',
      media: 'photo'
    }

  }

};