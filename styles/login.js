import css from 'styled-jsx/css'

export const loginUserDetail = css.resolve`
  div {
    display: flex;
    justify-content: center;
    vertical-align: middle;
  }
`
export const loginUserDetailAvatar = css.resolve`
  div {
    width: 30px;
    height: 30px;
  }
`
export const loginUserDetailAvatarImg = css.resolve`
  img {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid rgba(50, 63, 203, 0.5);
    opacity: 0.75;
    transition: all 200ms ease-in-out;
  }

  img:hover {
    opacity: 1;
    border-color: rgba(50, 63, 203);
  }
`
export const loginUserDetailItem = css.resolve`
  div {
    margin-left: 5px;
    line-height: 30px;
  }
`