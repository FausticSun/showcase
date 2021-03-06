import React from 'react';
import PropTypes from 'prop-types';

const SHORTNAME = 'showcaseyou';
const WEBSITE_URL = 'http://showcaseyou.heroku.com';

function renderDisqus() {
  if (window.DISQUS === undefined) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://${SHORTNAME}.disqus.com/embed.js`;
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    window.DISQUS.reset({ reload: true });
  }
}

class DisqusThread extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  };

  componentDidMount() {
    renderDisqus();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id ||
      this.props.title !== nextProps.title ||
      this.props.path !== nextProps.path;
  }

  componentDidUpdate() {
    renderDisqus();
  }

  render() {
    const { id, title, path, ...other } = this.props;

    window.disqus_config = function() {
      this.page.identifier = id;
      this.page.title = title;
      this.page.url = WEBSITE_URL + path;
    };

    return <div {...other} id="disqus_thread" />;
  }

}

export default DisqusThread;
