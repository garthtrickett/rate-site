import { db } from './index.ts'
import {
  users,
  organisations,
  professionals,
  professionalOrganisationMapping,
  customers,
  commonReviewFields,
  organisationReviews,
  professionalReviews
} from './schema/index.ts'

async function seed() {
  // Wipe all rows in the tables
  await db.delete(users)
  await db.delete(organisations)
  await db.delete(professionals)
  await db.delete(professionalOrganisationMapping)
  await db.delete(customers)
  await db.delete(commonReviewFields)
  await db.delete(organisationReviews)
  await db.delete(professionalReviews)

  const org = await db.insert(organisations).values({
    name: 'Your organisation name'
  })

  // List of hard-coded full names
  const professionalNames = [
    'Edward Scissorhands',
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Williams',
    'Charlie Brown'
  ]

  // Insert professionals with hard-coded full names
  for (let i = 0; i < professionalNames.length; i++) {
    const prof = await db.insert(professionals).values({
      name: professionalNames[i]
    })

    await db.insert(professionalOrganisationMapping).values({
      professionalId: Number(prof.insertId),
      organisationId: Number(org.insertId)
    })
  }

  const cust = await db.insert(customers).values({
    name: 'Your customer name'
  })

  // const commonReview = await db.insert(commonReviewFields).values({
  //   rating: 5,
  //   comments: 'Your review comments'
  // })

  // await db.insert(organisationReviews).values({
  //   commonReviewFieldsId: Number(commonReview.insertId),
  //   organisationId: Number(org.insertId),
  //   customerId: Number(cust.insertId)
  // })

  // await db.insert(professionalReviews).values({
  //   commonReviewFieldsId: Number(commonReview.insertId),
  //   professionalId: Number(prof.insertId),
  //   customerId: Number(cust.insertId)
  // })
}

seed()
  .then(() => console.log('Seeding completed'))
  .catch(error => console.error('Seeding failed:', error))
