import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemaTypes'
import { HomeIcon, EarthGlobeIcon, ImageIcon, CogIcon, UserIcon } from '@sanity/icons'




export default defineConfig({
  name: 'default',
  title: 'VF Immobilien NEW',
  projectId: 'ou5ivs6q',
  dataset: 'production',
  icon: HomeIcon, // Studio icon in browser tab
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Properties Section
            S.listItem()
              .title('Properties')
              .icon(HomeIcon)
              .child(
                S.documentTypeList('property')
                  .title('All Properties')
                  .defaultOrdering([{ field: 'title', direction: 'asc' }])
              ),
            
            // Reference Data Sections
            S.divider(),
            S.listItem()
              .title('Reference Data')
              .icon(EarthGlobeIcon)
              .child(
                S.list()
                  .title('Reference Data')
                  .items([
                    S.listItem()
                      .title('Categories')
                      .child(
                        S.documentTypeList('category').title('Categories')
                      ),
                    S.listItem()
                      .title('Amenities')
                      .child(
                        S.documentTypeList('ausstattung').title('Amenities')
                      ),
                    S.listItem()
                      .title('Public Transport')
                      .child(
                        S.documentTypeList('publicTransport').title('Public Transport')
                      ),
                    S.listItem()
                      .title('Agents')
                      .child(
                        S.documentTypeList('agent').title('Agents')
                      )
                  ])
              ),

            // Media Section
            S.divider(),
            S.listItem()
              .title('Media')
              .icon(ImageIcon)
              .child(
                S.documentTypeList('media')
                  .title('Media Assets')
              ),
            
            // Settings Section
            S.divider(),
            S.listItem()
              .title('Settings')
              .icon(CogIcon)
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    S.listItem()
                      .title('Site Settings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                      ),
                    // S.listItem()
                    //   .title('Navigation')
                    //   .child(
                    //     S.document()
                    //       .schemaType('navigation')
                    //       .documentId('navigation')
                      //)
                  ])
              ),
            
            // Other document types (hidden by default)
            S.divider(),
            ...S.documentTypeListItems()
              .filter(
                listItem => !['property', 'media', 'siteSettings', 'navigation', 'category', 'ausstattung', 'publicTransport', 'agent'].includes(listItem.getId() || '')
              )
          ]),
    }),
  ],

  schema: {
    types: [
      ...schemaTypes
    ],
  },

  // Optional Studio customization
  // studio: {
  //   components: {
  //     logo: () => <div style={{ padding: '0 15px', fontSize: '20px', fontWeight: 'bold' }}>VF Immobilien</div>
  //   }
  // },

  // Better default document actions
  document: {
    actions: (prev, { schemaType }) => {
      if (['siteSettings', 'navigation'].includes(schemaType)) {
        return prev.filter(
          ({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action)
        )
      }
      return prev
    }
  }
})