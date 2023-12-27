import { relations } from 'drizzle-orm'
import {
  mysqlTable,
  serial,
  varchar,
  bigint,
  int,
  primaryKey
} from 'drizzle-orm/mysql-core'

// AUTH START
export const users = mysqlTable('auth_user', {
  id: varchar('id', {
    length: 15 // change this when using custom user ids
  })
    .primaryKey()
    .notNull(),
  // other user attributes
  // other user attributes
  username: varchar('username', {
    length: 55
  }),
  names: varchar('names', {
    length: 255
  }),
  lastNames: varchar('last_names', {
    length: 255
  }),
  userType: varchar('user_type', { length: 50 })
})

export const sessions = mysqlTable('user_session', {
  id: varchar('id', {
    length: 191
  })
    .primaryKey()
    .notNull(),
  userId: varchar('user_id', {
    length: 15
  }).notNull(),
  activeExpires: bigint('active_expires', {
    mode: 'number'
  }).notNull(),
  idleExpires: bigint('idle_expires', {
    mode: 'number'
  }).notNull()
})

export const keys = mysqlTable('auth_key', {
  id: varchar('id', {
    length: 255
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15
  }).notNull(),
  // .references(() => user.id),
  hashedPassword: varchar('hashed_password', {
    length: 255
  })
})
// AUTH FINISH

export const organisations = mysqlTable('organisation', {
  id: serial('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 256 })
  // add other fields as necessary
})

// Maybe we want salon owners here ?

export const professionals = mysqlTable('professional', {
  id: serial('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 256 }),
  userId: varchar('user_id', { length: 191 })
  // add other fields as necessary
})

export const professionalOrganisationMapping = mysqlTable(
  'professionalOrganisationMapping',
  {
    professionalId: int('professionalId').notNull(),
    organisationId: int('organisationId').notNull()
  },
  t => ({
    pk: primaryKey({ columns: [t.professionalId, t.organisationId] })
  })
)

export const professionalOrganisationMappingRelations = relations(
  professionalOrganisationMapping,
  ({ one }) => ({
    professional: one(professionals, {
      fields: [professionalOrganisationMapping.professionalId],
      references: [professionals.id]
    }),
    organisation: one(organisations, {
      fields: [professionalOrganisationMapping.organisationId],
      references: [organisations.id]
    })
  })
)

// Mapping from the individual tablex to the join table
export const professionalsRelations = relations(professionals, ({ many }) => ({
  professionalOrganisationMappings: many(professionalOrganisationMapping)
}))

export const organisationsRelations = relations(organisations, ({ many }) => ({
  professionalOrganisationMappings: many(professionalOrganisationMapping)
}))

export const customers = mysqlTable('customer', {
  id: serial('id'),
  name: varchar('name', { length: 256 }),
  userId: varchar('user_id', { length: 15 })
})

export const customersRelations = relations(customers, ({ many }) => ({
  organisationReviews: many(organisationReviews),
  professionalReviews: many(professionalReviews)
}))

export const commonReviewFields = mysqlTable('commonReviewFields', {
  id: serial('id').primaryKey().autoincrement(),
  rating: int('rating'),
  comments: varchar('comments', { length: 1024 })
})

export const organisationReviews = mysqlTable('organisationReview', {
  id: serial('id').primaryKey().autoincrement(),
  commonReviewFieldsId: int('commonReviewFieldsId'),
  organisationId: int('organisationId'),
  customerId: int('customerId')
})

export const professionalReviews = mysqlTable('professionalReview', {
  id: serial('id').primaryKey().autoincrement(),
  professionalId: int('professionalId'),
  commonReviewFieldsId: int('commonReviewFieldsId'),
  customerId: int('customerId')
})

export const commonReviewFieldsRelations = relations(
  commonReviewFields,
  ({ one }) => ({
    organisationReview: one(organisationReviews, {
      fields: [commonReviewFields.id],
      references: [organisationReviews.commonReviewFieldsId]
    }),
    professionalReview: one(professionalReviews, {
      fields: [commonReviewFields.id],
      references: [professionalReviews.commonReviewFieldsId]
    })
  })
)

export const organisationReviewsRelations = relations(
  organisationReviews,
  ({ one }) => ({
    commonReviewFields: one(commonReviewFields, {
      fields: [organisationReviews.commonReviewFieldsId],
      references: [commonReviewFields.id]
    }),
    customer: one(customers, {
      fields: [organisationReviews.commonReviewFieldsId],
      references: [customers.id]
    })
  })
)

export const professionalReviewsRelations = relations(
  professionalReviews,
  ({ one }) => ({
    commonReviewFields: one(commonReviewFields, {
      fields: [professionalReviews.commonReviewFieldsId],
      references: [commonReviewFields.id]
    }),
    customer: one(customers, {
      fields: [professionalReviews.commonReviewFieldsId],
      references: [customers.id]
    })
  })
)
