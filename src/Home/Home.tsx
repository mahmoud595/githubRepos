import React,  { useState, useEffect }from "react"
import styled from "styled-components";
import {
  List,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  WindowScroller,
  Index
} from "react-virtualized";
import { MeasuredCellParent } from "react-virtualized/dist/es/CellMeasurer";

import { GithubRepo } from "./GithubRepo/GithubRepo";
import { getFirstDayFromMonth } from "../utils/helperFunctions";
import {useAxios} from "../utils/customHooks"
import {Repo} from "../utils/types/githubReposTypes"

const URL = "https://api.github.com/search/repositories?sort=stars&order=desc";

interface ListProps {
  index:number
   parent:MeasuredCellParent
   key:string
   style:React.CSSProperties
}

const Container = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 300,
});

export const Home:React.FC = ():JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [repos, setRepos] = useState<[] | Repo[]>([]);
  const { data, loading, error } = useAxios( `${URL}&q=created:%3E${getFirstDayFromMonth()}&page=${page}`);

  useEffect(() => {
    setRepos([...repos, ...data]);
  }, [data]);

  const fetchFeed = ():any=> {
     setPage(page + 1);
  };

  const isRowLoaded = ( params:Index ):boolean => {
    return !!repos[params.index];
  };

  const rowRenderer = (props:ListProps ):JSX.Element => {
    const repo = repos[props.index];
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={props.key}
        parent={props.parent}
        rowIndex={props.index}
      >
        {({ registerChild, measure }) => (
          <div style={{ ...props.style }} ref={registerChild} onLoad={measure}>
            <GithubRepo repo={repo} />
          </div>
        )}
      </CellMeasurer>
    );
  };
  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Sorry , Something went Wrong</h1>}
      {repos?.length ? (
        <>
          <WindowScroller serverHeight={1200} serverWidth={400}>
            {({ height, isScrolling, onChildScroll, scrollTop, width }) => (
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={fetchFeed}
                rowCount={repos.length + 1}
              >
                {({ onRowsRendered, registerChild }) => (
                  <List
                    autoHeight
                    height={height}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    rowCount={repos.length}
                    rowHeight={cache.rowHeight}
                    rowRenderer={rowRenderer}
                    width={width - width * 0.5}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    deferredMeasurementCache={cache}
                    scrollTop={scrollTop}
                    style={{
                      outline: "none",
                      transform: "translateX(-7px)",
                    }}
                  />
                )}
              </InfiniteLoader>
            )}
          </WindowScroller>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};
