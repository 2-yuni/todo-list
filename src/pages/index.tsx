/** @jsxImportSource @emotion/react */

import styles from "@/styles/Home.module.css";
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { useEffect, useState } from "react";
import Button from "../../components/Button";

//외부 API에서 초기 To-Do 리스트 데이터를 가져오는 기능
//할일을 추가하는 기능
//할일을 완료처리하는 기능
//할일을 삭제하는 기능
//로컬스토리지를 사용하여 데이터를 저장하고 앱이 다시 로드될 떄 데이터를 불러오는 기능

type Board = {
  userId: string;
  id: number;
  title: string;
  complete: boolean;
};

export default function Home({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [inputText, setInputText] = useState<string>("");
  const [board, setBoard] = useState<Board[]>([]);

  useEffect(() => {
    const localBoard = localStorage?.getItem("List");
    localBoard?.length === 1
      ? setBoard(JSON.parse(localBoard))
      : setBoard(repo);
  }, []);
  return (
    <>
      <div
        css={{
          textAlign: "center",
        }}
      >
        <h1>TODO-LIST</h1>
        <input
          type="text"
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          value={inputText}
          placeholder="추가할 할일을 입력하세요"
          css={{
            width: "100%",
            padding: "12px 20px",
            margin: "8px 0",
            boxSizing: "border-box",
          }}
        ></input>
        <Button
          label="추가"
          onClick={async () => {
            const newList = [
              ...board,
              {
                userId: "test",
                id: board.length ? Math.max(...board.map((b) => b.id)) + 1 : 1,
                title: inputText,
                complete: false,
              },
            ];
            setBoard(newList);
            localStorage.setItem("List", JSON.stringify(newList));
            setInputText("");
          }}
        ></Button>
        <ul
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            paddingLeft: "0",
          }}
        >
          {board.map((i, k) => {
            return (
              <li
                className={styles.listBox}
                key={k}
                css={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <input
                  type="checkbox"
                  checked={i.complete}
                  onChange={(e) => {
                    const newList = board.map((board) => {
                      board.id == i.id
                        ? (board.complete = e.target.checked)
                        : "";
                      return board;
                    });
                    setBoard(newList);
                    localStorage.setItem("List", JSON.stringify(newList));
                  }}
                ></input>
                <span
                  css={{ textDecoration: i.complete ? "line-through" : "none" }}
                >
                  {i.title}
                </span>

                <Button
                  deleted
                  label="삭제"
                  onClick={async () => {
                    alert("삭제하시겠습니까?");
                    const newList = board.filter((board) => board.id !== i.id);
                    setBoard(newList);
                    localStorage.setItem("List", JSON.stringify(newList));
                  }}
                ></Button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export const getStaticProps = (async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const repo: Board[] = await res.json();
  return { props: { repo } };
}) satisfies GetStaticProps<{ repo: Board[] }>;
//
