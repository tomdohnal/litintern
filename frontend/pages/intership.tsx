import { NextContext } from 'next'
import React, { Component } from 'react'
import IntershipDetail from '../components/IntershipDetail'

interface IProps {
  id: number
}

class Intership extends Component<IProps> {
  static getInitialProps({ query }: NextContext) {
    return { id: Number(query.id) }
  }

  render() {
    return <IntershipDetail id={this.props.id} />
  }
}

export default Intership
