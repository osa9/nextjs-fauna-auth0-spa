import useFetch from '../lib/useFetch'

function getData(data) {
  if (!data || data.errors) return null
  return data.data
}

function getErrorMessage(error, data) {
  if (error) return error.message
  if (data && data.errors) {
    return data.errors[0].message
  }
  return null
}

/**
|--------------------------------------------------
| This GraphQL query returns an array of Guestbook
| entries complete with both the provided and implicit
| data attributes.
|
| Learn more about GraphQL: https://graphql.org/learn/
|--------------------------------------------------
*/
export const useGuestbookEntries = (token) => {
  const query = `query Entries($size: Int) {
    entries(_size: $size) {
      data {
        _id
        _ts
        story
        owner {
          _id
          email
          picture
        }
      }
      after
    }
  }`
  const size = 100
  const { data, error } = useFetch(process.env.FAUNA_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { size },
    }),
  })

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error,
  }
}

/**
|--------------------------------------------------
| This GraphQL mutation creates a new GuestbookEntry
| with the requisite story arguments.
|
| It returns the stored data and includes the unique
| identifier (_id) as well as _ts (time created).
|
| The guestbook uses the _id value as the unique key
| and the _ts value to sort and display the date of
| publication.
|
| Learn more about GraphQL mutations: https://graphql.org/learn/queries/#mutations
|--------------------------------------------------
*/
export const createGuestbookEntry = async (story, owner, token) => {
  console.log(owner, token);
  const query = `mutation CreateGuestbookEntry($story: String!, $owner: ID!) {
    createGuestbookEntry(data: {
      story: $story
      owner: {connect: $owner}
    }) {
      _id
      _ts
      story
      owner {
        _id
        email
        picture
      }
    }
  }`

  const res = await fetch(process.env.FAUNA_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { story, owner },
    }),
  })
  const data = await res.json()

  if(data.errors) throw Error(data.errors[0].message)

  return data
}

export const updateGuestbookEntry = async (entryId, newStory, token) => {
  const query = `mutation UpdateGuestbookEntry($entryId: ID!, $story: String!) {
    partialUpdateGuestbookEntry(id: $entryId, data: {
      story: $story
    }) {
      _id
      _ts
      story
    }
  }`

  const res = await fetch(process.env.FAUNA_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Schema-Preview': 'partial-update-mutation',
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { twitterHandle, story, owner },
    }),
  })
  const data = await res.json()

  if(data.errors) throw Error(data.errors[0].message)

  return data
}

export const deleteGuestbookEntry = async (entryId, token) => {
  const query = `mutation DeleteGuestbookEntry($entryId: ID!) {
    deleteGuestbookEntry(id: $entryId) {
      _id
    }
  }`

  const res = await fetch(process.env.FAUNA_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { entryId },
    }),
  })
  const data = await res.json()

  if(data.errors) throw Error(data.errors[0].message)

  return data
}