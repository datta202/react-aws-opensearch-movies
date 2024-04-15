import styled from 'styled-components'

export const Container = styled.div`
    width: calc(100vw - 60px);
    max-height: 100vh;
    padding: 0 30px 30px;
    padding-right: 10px;
    /* overflow: auto; */
`;

export const StyledFiltersAndHits = styled.div`
  overflow: auto;
  max-height: calc(100vh - 175px);
  padding-left: 1px;
  padding-top:10px;
  padding-right:10px;
  display: flex;
  margin-top:10px;

  .ais-Hits {
    display:flex;
    flex: 1;
    .ais-Hits-list {
      /* display:flex;
      flex: */
      flex: 1;
    }
  }

  .ais-RefinementList-list {
      max-height: 100px;
      overflow: auto;
    }
`

export const StyledFilters = styled.div`
    width: 300px;
    padding-right: 30px;

   
`

export const StyledPanel = styled.div`
  color: inherit;
  h5 {
    margin: 0;
  }

`