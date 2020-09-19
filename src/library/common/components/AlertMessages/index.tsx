import React, { createContext, Component } from 'react';

import { IAlertMessageType } from 'library/types';
import Toast from './Toast';

import './AlertMessage.style.scss';

export const AlertMessagesContext: any = createContext({ addAlertMessages: (newMessages: IAlertMessageType[]) => {} });

interface IAlertMessagesProps {
  children: JSX.Element;
}
interface IAlertMessagesState {
  alertMessages: { type: 'success' | 'error'; message: string }[];
}

class AlertMessages extends Component<IAlertMessagesProps, IAlertMessagesState> {
  constructor(props) {
    super(props);
    this.state = {
      alertMessages: [],
    };
  }

  addAlertMessages = (newMessages: IAlertMessageType[]) => {
    newMessages.forEach((_, i) => {
      const transitionTimeMs = 6000 + i * 2000;
      setTimeout(() => {
        this.setState(prevState => {
          return {
            alertMessages: prevState.alertMessages.filter((_, i) => i !== prevState.alertMessages.length - 1),
          };
        });
      }, transitionTimeMs);
    });
    this.setState({ alertMessages: this.state.alertMessages.concat(newMessages) });
  };

  toggleToast = (index: number) => (): void => {
    this.setState(prevState => ({ alertMessages: prevState.alertMessages.filter((_, i) => i !== index) }));
  };

  render() {
    const { alertMessages } = this.state;
    return (
      <AlertMessagesContext.Provider value={{ addAlertMessages: this.addAlertMessages }}>
        {this.props.children}
        <div className="alert-message">
          {alertMessages.map((alertMessage, index) => (
            <Toast key={index} {...alertMessage} isFirst={index === 0} toggleToast={this.toggleToast(index)} />
          ))}
        </div>
      </AlertMessagesContext.Provider>
    );
  }
}

export default AlertMessages;
