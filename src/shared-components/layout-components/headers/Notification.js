import React, { useState, useRef } from 'react';
import Popover from 'react-bootstrap/Popover';
import { BsBell } from 'react-icons/bs';
import { Image, Overlay } from 'react-bootstrap';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import moment from 'moment';
const Notification = () => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  return (
    <div ref={ref}>
      <div onClick={handleClick}>
        <BsBell size={25} />
        <span className="notification-count">10</span>
      </div>

      <Overlay
        rootClose={show}
        onHide={() => setShow(false)}
        show={show}
        target={target}
        id="abcdef"
        placement="bottom-end"
        container={ref}
        containerPadding={20}>
        <Popover id="popover-contained" className="notification-popover">
          <Popover.Header as="h3" className="text-dark text-center">
            Notifications
          </Popover.Header>
          {[1, 2, 3].map((res) => {
            return (
              <Popover.Body className="pt-1 pb-0 notification-body" key={`index${res}`}>
                <div className="headerNotification">
                  <Image
                    src="https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?w=2000"
                    roundedCircle={true}
                    className="notificationImg"
                  />
                  <div>
                    <div className="d-flex justify-content-between">
                      <strong>Holy guacamole!</strong> <small>{moment().format('DD MMM YYYY')}</small>
                    </div>
                    <p>
                      <small>You Have received campaign approval request from name admin</small>
                      <a className="ms-3 viewLink">view Campaign</a>
                    </p>
                  </div>
                  <p>
                    <BiDotsVerticalRounded />
                  </p>
                </div>
              </Popover.Body>
            );
          })}
        </Popover>
      </Overlay>
    </div>
  );
};

export default Notification;
