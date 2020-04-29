import { useState, useEffect } from 'react'
import {useGuestbookEntries, createGuestbookEntry, deleteGuestbookEntry} from '../graphql/api'
import Header from './Header'
import Login from './Login'
import GuestbookEntry from './GuestbookEntry'
import GuestbookEntryDivider from './GuestbookEntryDivider'


import {
  hero,
  heroContainer,
  heroForm,
  heroFormFieldset,
  heroFormTextArea,
  heroFormTwitterInput,
  heroFormSubmitButton,
  heroEntries,
} from '../styles/hero'
import {useAuth} from "react-use-auth"


function getEntries(data) {
  return data ? data.entries.data.reverse() : []
}

export default _props => {
  const { isAuthenticated, user } = useAuth();
  const { token, userId } = (user && user['https://fauna.com/']) || {}
  const { data, errorMessage } = useGuestbookEntries(token || process.env.FAUNA_ANONYMOUS_KEY)
  const [entries, setEntries] = useState([])
  const [story, setStory] = useState('')
  const [submitting, setSubmitting] = useState(false)


  useEffect(() => {
    if (!entries.length) {
      setEntries(getEntries(data))
    }
  }, [data, entries.length])

  function handleSubmit(event) {
    event.preventDefault()
    if (story.trim().length === 0) {
      alert('No favorite memory? This cannot be!')
      return
    }
    setSubmitting(true)
    createGuestbookEntry(story, userId, token)
      .then(data => {
        entries.unshift(data.data.createGuestbookEntry)
        setStory('')
        setEntries(entries)
        setSubmitting(false)
      })
      .catch(error => {
        console.log(`boo :( ${error}`)
        alert('🤷‍♀️')
        setSubmitting(false)
      })
  }

  function handleStoryChange(event) {
    setStory(event.target.value)
  }

  function handleDeleteStory(entryId) {
    deleteGuestbookEntry(entryId, token)
        .then(data => {
          const newEntries = entries.filter((entry) => entry._id !== entryId)
          setEntries(newEntries)
        })
        .catch(error => {
          console.log(`boo :( ${error}`)
          alert('🤷‍♀️')
          setSubmitting(false)
        })
  }

  return (
    <div className={heroContainer.className}>
      <div className={hero.className}>
        <Header />
        <Login />
        <form className={heroForm.className} onSubmit={handleSubmit}>
          <fieldset
            className={heroFormFieldset.className}
            disabled={submitting && 'disabled'}
          >
            <textarea
              className={heroFormTextArea.className}
              rows="5"
              cols="50"
              name="story"
              placeholder="What is your favorite memory as a developer?"
              onChange={handleStoryChange}
              value={story}
              disabled={!(isAuthenticated() && user)}
              style={{backgroundColor: isAuthenticated() ? '#fff' : '#eee'}}
            />
            <input
              className={heroFormSubmitButton.className}
              type="submit"
              value="Submit"
            />
          </fieldset>
        </form>
      </div>
      <div className={heroEntries.className}>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : !data ? (
          <p>Loading entries...</p>
        ) : (
          entries.map((entry, index, allEntries) => {
            const date = new Date(entry._ts / 1000)

            return (
              <div key={entry._id}>
                <GuestbookEntry
                  id={entry._id}
                  name={entry.owner.email}
                  isOwner={isAuthenticated() && entry.owner._id === userId}
                  picture={entry.owner.picture}
                  story={entry.story}
                  date={date}
                  onDelete={handleDeleteStory}
                />
                {index < allEntries.length - 1 && <GuestbookEntryDivider />}
              </div>
            )
          })
        )}
      </div>
      {heroEntries.styles}
      {heroFormSubmitButton.styles}
      {heroFormTwitterInput.styles}
      {heroFormTextArea.styles}
      {heroFormFieldset.styles}
      {heroForm.styles}
      {heroContainer.styles}
      {hero.styles}
    </div>
  )
}
