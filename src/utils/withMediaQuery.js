import React, {Component} from 'react'

export const withMedia = (Comp, queries) => {
  const media = createMediaListener(queries);

  return class WithMedia extends Component {
    state = {
      media: media.getState()
    };

    componentDidMount() {
      media.listen(media => this.setState({ media }));
    }

    componentWillUnmount() {
      media.dispose();
    }

    render() {
      return <Comp {...this.state} />;
    }
  };
};

const createMediaListener = (media) => {
  let transientListener = null;

  const mediaKeys = Object.keys(media);

  const queryLists = mediaKeys.reduce((queryLists, key) => {
    queryLists[key] = window.matchMedia(media[key]);
    return queryLists;
  }, {});

  const mediaState = mediaKeys.reduce((state, key) => {
    state[key] = queryLists[key].matches;
    return state;
  }, {});

  const notify = () => {
    if (transientListener != null) transientListener(mediaState);
  };

  const mutateMediaState = (key, val) => {
    mediaState[key] = val;
    notify();
  };

  const listeners = mediaKeys.reduce((listeners, key) => {
    listeners[key] = event => {
      mutateMediaState(key, event.matches);
    };
    return listeners;
  }, {});

  const listen = listener => {
    transientListener = listener;
    mediaKeys.forEach(key => {
      queryLists[key].addListener(listeners[key]);
    });
  };

  const dispose = () => {
    transientListener = null;
    mediaKeys.forEach(key => {
      queryLists[key].removeListener(listeners[key]);
    });
  };

  const getState = () => mediaState;

  return { listen, dispose, getState };
};