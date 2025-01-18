import React from "react";

type Props = {
  title?: string;
  author?: string;
  date?: string;
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
};

const Article: React.FC<Props> = ({ title, author, date, children }) => {
  return (
    <article
      className={
        "w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert"
      }
    >
      <header className={"mb-4 lg:mb-6 not-format"}>
        <address className={"flex items-center mb-6 not-italic"}>
          <div
            className={
              "inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"
            }
          >
            <img
              className={"mr-4 w-16 h-16 rounded-full"}
              src={"images/1663371833626.jpeg"}
              alt={author}
            />
            <div>
              <a
                href={"/"}
                rel={"author"}
                className={"text-xl font-bold text-gray-900 dark:text-white"}
              >
                {author}
              </a>
              <p
                className={
                  "text-base font-light text-gray-500 dark:text-gray-400"
                }
              ></p>
              {date ? (
                <p
                  className={
                    "text-base font-light text-gray-500 dark:text-gray-400"
                  }
                >
                  {date}
                </p>
              ) : null}
            </div>
          </div>
        </address>
        <h1
          className={
            "mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white"
          }
        >
          {title}
        </h1>
      </header>
      {children}
    </article>
  );
};

export default Article;
