import { css } from "styled-system/css";

export const headerContainer = css({
    display:'flex',
    flexDir: 'row',
    backgroundColor: '#f2f1ed',
    height: 'auto',
    minH:'3rem',
    gap: '1rem',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: '2rem',
    flexWrap: 'wrap',
});


export const headerLogo = css({
    fontWeight:700,
});

export const headerContactsContainer = css({
    display:'flex',
    justifyItems:'flex-end',
    gap: '1rem',
    flexWrap: 'wrap',
});
