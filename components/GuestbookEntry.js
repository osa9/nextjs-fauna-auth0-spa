import {
  guestbookEntry,
  guestbookEntryUserDetail,
  guestbookEntryUserDetailAvatar,
  guestbookEntryUserDetailAvatarImg,
  guestbookEntryUserDetailTimestamp,
  guestbookEntryUserDetailBiolink,
  guestbookEntryStory,
  guestbookEntryUsername,
  guestbookEntryShare,
  guestbookEntryShareTwitterButton,
  guestbookEntryShareTwitterButtonLogo1,
  guestbookEntryShareTwitterButtonLogo2,
} from '../styles/guestbookentry'

export default props => (
  <>
    <div className={guestbookEntry.className}>
      <div className={guestbookEntryUserDetail.className}>
        <div className={guestbookEntryUserDetailAvatar.className}>
            <img
              className={guestbookEntryUserDetailAvatarImg.className}
              src={props.picture}
            />
        </div>
        <span className={guestbookEntryUserDetailTimestamp.className}>
          {props.date.toDateString()}
        </span>
      </div>
      <div className={guestbookEntryStory.className}>
        <div className={guestbookEntryUsername.className}><i>{props.name}{props.isOwner && ' (You)'} wrote:</i></div>
        <div>{props.story}</div>
      </div>
    </div>
    <div className={guestbookEntryShare.className}>
      <div><button onClick={() => props.onDelete(props.id)}>Delete (only owner of this entry)</button></div>
    </div>
    {guestbookEntry.styles}
    {guestbookEntryShare.styles}
    {guestbookEntryShareTwitterButton.styles}
    {guestbookEntryShareTwitterButtonLogo1.styles}
    {guestbookEntryShareTwitterButtonLogo2.styles}
    {guestbookEntryStory.styles}
    {guestbookEntryUsername.styles}
    {guestbookEntryUserDetail.styles}
    {guestbookEntryUserDetailAvatar.styles}
    {guestbookEntryUserDetailAvatarImg.styles}
    {guestbookEntryUserDetailBiolink.styles}
    {guestbookEntryUserDetailTimestamp.styles}
  </>
)
