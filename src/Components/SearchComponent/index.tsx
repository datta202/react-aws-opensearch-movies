import Searchkit from "searchkit"
import type { SearchRequest } from "searchkit"
import { InstantSearch, SearchBox, Hits, Highlight, Snippet, RefinementList } from 'react-instantsearch'
import { ESTransporter } from './utils/Transporter'
import Client from "@searchkit/instantsearch-client";
import { Container, StyledFiltersAndHits, StyledFilters, StyledPanel } from './styles'
import { useEffect, useState } from "react";



/* 
* < !--Searchkit Stylesheet-- >
*  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/satellite-min.css"></link>
* 
*  - This is not working, so added content in below file and import that csss 
*/
import './satelite-min.css';

class MyTransporter extends ESTransporter {
  async performNetworkRequest(requests: SearchRequest[]) {

    // you can use any http client here
    return fetch(`https://qotkkpz8oa.execute-api.us-east-2.amazonaws.com/api-opensearch-movies`, {
      // return fetch(`http://localhost:3000`, {
      headers: {
        "Content-Type": "application/json",
        // Add custom headers here
        "x-api-key": this.config.apiKey || ""
      },
      body: JSON.stringify(requests[0].body),
      method: 'POST'
    })
  }
}



export const App = () => {

  const [key, setKey] = useState("");

  useEffect(() => {
    if (key) {
      return
    }
    setTimeout(() => {
      setKey(window.prompt("Enter api key") || "");

    }, 100)

  }, [key])



  const sk = new Searchkit({
    connection: new MyTransporter({ host: "https://qotkkpz8oa.execute-api.us-east-2.amazonaws.com/api-opensearch-movies", apiKey: key }, { debug: true }),
    search_settings: {
      search_attributes: ["title"],
      result_attributes: ["title", "plot", "directors", "actors"],
      highlight_attributes: ["title"], // 
      snippet_attributes: ["plot"], // this shows plot text in snippet component
      facet_attributes: [
        { attribute: 'directors', field: 'directors.keyword', type: "string" },
        {
          attribute: 'actors',
          field: 'actors.keyword',
          type: 'string'
        }
      ]
    }
  })

  const searchClient = Client(sk, {});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HitView = ({ hit }: any) => (
    <div>
      <h2>
        <Highlight attribute="title" hit={hit} />
      </h2>

      <Snippet attribute="plot" hit={hit} />
    </div>
  );



  // const results = await client.handleRequest(req.body, {
  //   getQuery: (query, search_attributes) => {
  //     return [
  //       {
  //         combined_fields: {
  //           query,
  //           fields: search_attributes,
  //         },
  //       },
  //     ];
  //   }
  // });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Panel = ({ header, children }: any) => {
    // console.log(props)
    return (
      <StyledPanel className="panel">
        <h5>{header}</h5>
        {children}
      </StyledPanel>
    )
  }



  return (
    <Container>
      <h2>React - Opensearch Movies Search Application</h2>
      <InstantSearch searchClient={searchClient} indexName="movies">
        <SearchBox />
        <StyledFiltersAndHits>
          <StyledFilters>
            <Panel header={"Directors"}>
              <RefinementList
                attribute="directors"
                searchable={true}
                limit={3}
                showMoreLimit={4}
                showMore
                searchablePlaceholder="Search Directors" />
            </Panel>
            <Panel header={"Actors"}>
              <RefinementList
                attribute="actors"
                searchable={true}
                limit={3}
                showMoreLimit={4}
                showMore
                searchablePlaceholder="Search Actors" />
            </Panel>
          </StyledFilters>
          <Hits hitComponent={HitView} />
        </StyledFiltersAndHits>
      </InstantSearch>
    </Container>
  )
}

export default App;