import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'

export async function up({ payload, req, session }: MigrateUpArgs): Promise<void> {
  // Create a test page and set it to published.
  const testPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Test',
      _status: 'published',
    },
  })

  // Create a draft version of the test page.
  await payload.update({
    collection: 'pages',
    id: testPage.id,
    draft: true,
    data: {
      title: 'Test Updated',
    },
  })

  // Update the page without any `draft` or `_status` fields.
  await payload.update({
    collection: 'pages',
    id: testPage.id,
    data: {
      title: 'Test Updated',
    },
  })

  // The document will now have lost the "Currently Published" version.
  // Always returning the latest draft version, even if `draft=false` is passed.
}

export async function down({ payload, req, session }: MigrateDownArgs): Promise<void> {
  await payload.delete({
    collection: 'pages',
    where: {},
  })
}
