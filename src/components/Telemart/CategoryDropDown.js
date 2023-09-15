import React, { useCallback, useState } from 'react';
import arrow from '../../assets/images/buttonArrow.svg';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../../reducers/telemart';
const App = () => {
  const [current, setCurrent] = useState('');
  const [visible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.telemartSlice);
  const handleCategory = useCallback(
    (e) => {
      setIsVisible(false);
      dispatch(setSelectedCategory(e));
      setIsVisible(false);
      document.body.classList.remove('cat-open');
      navigate(`/telemart/products/${e.category_id}`);
    },
    [navigate, dispatch]
  );
  const categoriesWithGroup = useCallback(() => {
    const addChild = (obj) => {
      let children = categories.filter((a) => a.parent_id === obj.id).map(addChild);
      children = children.map((d) => {
        return {
          ...d,
          label: (
            <li
              onClick={() => {
                handleCategory(d);
              }}>
              {d.title}
            </li>
          ),
          key: d.id
        };
      });

      if (children.length > 0) {
        return { ...obj, children };
      }

      return { ...obj, children: null };
    };

    let result = categories.filter((a) => a.parent_id === 0).map(addChild);
    result = result.map((d) => {
      return {
        ...d,
        label: (
          <li
            onClick={() => {
              handleCategory(d);
            }}>
            {d.title}
          </li>
        ),
        key: d.id,
        type: d.parent_id
      };
    });

    return result;
  }, [categories, handleCategory]);
  const handleClick = (e) => {
    navigate(`/products/${e.key}`);
    setCurrent(e.key);
  };
  // const items = [
  //   {
  //     label: 'All Categories',
  //     key: 'main',
  //     children: categoriesWithGroup(),
  //     title: 'news'
  //   }
  // ];
  const items = categoriesWithGroup();

  // const catMenuHandler = () => {
  //   document.body.classList.add('cat-open');
  // }

  const handleVisibleChange = (a) => {
    if (a) {
      document.body.classList.add('cat-open');
    } else {
      document.body.classList.remove('cat-open');
      setIsVisible(false);
    }
    // document.body.classList.remove('cat-open');
  };
  // document.body.classList.add('cat-open')

  return (
    <>
      <div className="catego-btn">
        <Dropdown
          menu={{
            items
          }}
          onVisibleChange={handleVisibleChange}
          visible={visible}
          trigger={['click']}>
          <a style={{ color: '#302F2F', cursor: 'pointer' }}>
            <Space>
              <span onClick={() => setIsVisible(!visible)}> All Categories</span>
              <img className="btnArrow" alt="Arrow Button" src={arrow} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </>
  );
};
export default App;
