import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import update from "immutability-helper";
import config from "../config";
import AuthContext from "./AuthContext";

const PageContext = createContext();
export default PageContext;

export const PageProvider = ({ children }) => {
  const initialPages = [
    {
      Id: 0,
      name: "Untitled",
      fields: [
        {
          Id: 0,
          text: "",
        },
      ],
    },
  ];

  const { user } = useContext(AuthContext);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(initialPages[0]);
  const [fields, setFields] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleTitleChange = (e) => {
    setPage({ ...page, name: e.target.value });
  };

  useEffect(() => {
    const getAllPages = async () => {
      let registerRequest;
      try {
        registerRequest = await axios.get(`${config.SERVER_URL}/api/v1/pages`, {
          headers: {
            authorization: `Bearer ${user._token}`,
          },
        });
      } catch ({ response }) {
        registerRequest = response;
      }

      const { data: registerRequestData } = registerRequest;
      if (registerRequestData.status) {
        setPages([...registerRequestData.data]);
      }
    };

    getAllPages();
  }, []);

  const removePage = async (e, id) => {
    e.preventDefault();
    let registerRequest;
    try {
      registerRequest = await axios.delete(
        `${config.SERVER_URL}/api/v1/pages/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${user._token}`,
          },
        }
      );
    } catch ({ response }) {
      registerRequest = response;
    }

    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.status) {
      const copyPages = pages.filter((page) => page.Id !== id);
      setPages(copyPages);
    }
    setIsOpen(!isOpen);
  };

  const getAllFieldByPage = async (page) => {
    let registerRequest;
    try {
      registerRequest = await axios.get(
        `${config.SERVER_URL}/api/v1/pages/${page.Id}/fields`,
        {
          headers: {
            authorization: `Bearer ${user._token}`,
          },
        }
      );
    } catch ({ response }) {
      registerRequest = response;
    }

    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.status) {
      const sortedFields = registerRequestData.data.fields.sort(function (
        a,
        b
      ) {
        return a.sort_order - b.sort_order;
      });

      setFields(sortedFields);
    }
  };

  const handleClick = (e, id) => {
    e.preventDefault();

    const page = pages.filter((page) => page.Id === id)[0];
    setPage(page);
    getAllFieldByPage(page);
    setIsOpen(true);
  };

  const addNewPage = async (e) => {
    e.preventDefault();
    let registerRequest;
    try {
      registerRequest = await axios.post(
        `${config.SERVER_URL}/api/v1/pages/create`,
        {
          name: "Untitled",
        },
        {
          headers: {
            authorization: `Bearer ${user._token}`,
          },
        }
      );
    } catch ({ response }) {
      registerRequest = response;
    }

    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.status) {
      setPages([...pages, { ...registerRequestData.data }]);
    }
    setIsOpen(!isOpen);
  };

  const addNewField = async (e) => {
    e.preventDefault();
    let registerRequest;
    try {
      registerRequest = await axios.post(
        `${config.SERVER_URL}/api/v1/fields/create`,
        {
          pageId: page.Id,
          name: "Untitled",
        },
        {
          headers: {
            authorization: `Bearer ${user._token}`,
          },
        }
      );
    } catch ({ response }) {
      registerRequest = response;
    }

    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.status) {
      setFields([...fields, { ...registerRequestData.data }]);
    }
  };

  const EditExistingPage = async (e) => {
    e.preventDefault();
    const fields = ["header"];
    const formElements = e.target.elements;

    const formValues = fields
      .map((field) => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));
    let registerRequest;
    try {
      registerRequest = await axios.patch(
        `${config.SERVER_URL}/api/v1/pages/update/${page.Id}`,
        {
          name: formValues.header,
        },
        {
          headers: {
            authorization: `Bearer ${user._token}`,
          },
        }
      );
    } catch ({ response }) {
      registerRequest = response;
    }

    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.status) {
      const pageIndex = pages.findIndex((p) => {
        return p.Id === registerRequestData.data.Id;
      });
      pages[pageIndex].name = registerRequestData.data.name;

      setPages([...pages]);
    }
  };

  const removeField = async (e, id) => {
    e.preventDefault();
    let registerRequest;
    try {
      registerRequest = await axios.delete(
        `${config.SERVER_URL}/api/v1/fields/delete/${id}?pageId=${page.Id}`,
        {
          headers: {
            authorization: `Bearer ${user._token}`,
          },
        }
      );
    } catch ({ response }) {
      registerRequest = response;
    }

    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.status) {
      const copyFields = fields.filter((field) => field.Id !== id);
      setFields(copyFields);
    }
  };

  const onKeyDownField = async (event, id) => {
    if (event.key === "Enter") {
      let registerRequest;
      try {
        registerRequest = await axios.patch(
          `${config.SERVER_URL}/api/v1/fields/update`,
          {
            pageId: page.Id,
            fieldId: id,
            sort_order: id,
            name: event.target.value,
          },
          {
            headers: {
              authorization: `Bearer ${user._token}`,
            },
          }
        );
      } catch ({ response }) {
        registerRequest = response;
      }

      const { data: registerRequestData } = registerRequest;
      if (registerRequestData.status) {
        const fieldIndex = fields.findIndex((p) => {
          return p.Id === registerRequestData.data.Id;
        });
        fields[fieldIndex].name = registerRequestData.data.name;
        setFields([...fields]);
      }
    }
  };

  const moveField = useCallback(
    (dragIndex, hoverIndex) => {
      setFields((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    },
    [fields]
  );

  const updateFields = async (allFields) => {
    let registerRequest;
    try {
      registerRequest = await axios.patch(
        `${config.SERVER_URL}/api/v1/fields/update/all`,
        {
          fields: allFields,
        },
        {
          headers: {
            authorization: `Bearer ${user._token}`,
          },
        }
      );
    } catch ({ response }) {
      registerRequest = response;
    }
    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.status) {
    }
  };

  const contextData = {
    handleTitleChange,
    addNewPage,
    EditExistingPage,
    addNewField,
    pages,
    setPages,
    removePage,
    handleClick,
    page,
    fields,
    removeField,
    onKeyDownField,
    moveField,
    updateFields,
    isOpen,
  };

  return (
    <PageContext.Provider value={contextData}>{children}</PageContext.Provider>
  );
};
