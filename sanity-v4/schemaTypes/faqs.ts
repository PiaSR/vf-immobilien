import { defineField, defineType } from 'sanity';

export default defineType({
  // 1. Technical name for the schema
  name: 'faqItem',
  
  // 2. Human-readable name displayed in the studio
  title: 'FAQ Item',
  
  // 3. Document type icon
  type: 'document',
  
  // 4. Fields that make up the content
  fields: [
    defineField({ // Defines the Question field
      name: 'question',
      title: 'Frage',
      type: 'string',
      description: 'Die häufig gestellte Frage.',
      // 'Rule' is now correctly inferred by TypeScript
      validation: (Rule) => Rule.required(), 
    }),
    defineField({ // Defines the Answer field (plain text)
      name: 'answer',
      title: 'Antwort',
      // Using 'text' provides a multi-line input without rich text controls.
      type: 'text', 
      description: 'Die Antwort zur Frage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ // Defines the Category field
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Wen betrifft die Frage - Eigentümer oder Mieter',
      options: {
        list: [
        
          { title: 'Eigentümer', value: 'owners' },
          { title: 'Mieter', value: 'renters' },
        ],
        layout: 'dropdown',
      },
    }),
   
  ],
  
  // 5. Preview configuration (how the item looks in the list)
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle ? `Category: ${subtitle}` : 'No Category',
      };
    },
  },
});