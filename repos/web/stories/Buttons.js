import { cn } from 'react-ui-pack'
import React, { Component } from 'react'
import Button from 'react-ui-pack/Button'
import Icon from 'react-ui-pack/Icon'
import Row from 'react-ui-pack/Row'
import View from 'react-ui-pack/View'

/**
 * Button States
 */
export default class Buttons extends Component {
  renderButtonGroups = ({className, children, ...props}) => (<View className='margin'>
    {/* Default */}
    <Row className='wrap middle margin-v-smaller spread'>
      <Button className={cn('large', className)} {...props}>{children || 'Large'}</Button>
      <Button className={cn(className)} {...props}>{children || className || 'Default'}</Button>
      <Button className={cn('small', className)} {...props}>{children || 'Small'}</Button>
    </Row>

    {/* Disabled */}
    <Row className='wrap middle margin-v-smaller spread'>
      <Button disabled className={cn('large', className)} {...props}>{children || 'Large'}</Button>
      <Button disabled className={cn(className)} {...props}>{children || className || 'Default'}</Button>
      <Button disabled className={cn('small', className)} {...props}>{children || 'Small'}</Button>
    </Row>

    {/* Loading */}
    <Row className='wrap middle margin-v-smaller spread'>
      <Button loading className={cn('large', className)} {...props}>{children || 'Large'}</Button>
      <Button loading className={cn(className)} {...props}>{children || className || 'Default'}</Button>
      <Button loading className={cn('small', className)} {...props}>{children || 'Small'}</Button>
    </Row>
  </View>)

  render () {
    return (
      <Row className='full-width center wrap'>
        <View className='margin'>
          {this.renderButtonGroups({className: 'primary'})}
          {this.renderButtonGroups({className: 'primary round'})}
          {this.renderButtonGroups({className: 'primary', circle: true, children: <Icon name='heart'/>})}
        </View>
        <View className='margin'>
          {this.renderButtonGroups({className: 'secondary'})}
          {this.renderButtonGroups({className: 'secondary round'})}
          {this.renderButtonGroups({className: 'secondary', circle: true, children: <Icon name='heart'/>})}
        </View>
        <View className='margin'>
          {this.renderButtonGroups({name: 'Default'})}
          {this.renderButtonGroups({name: 'Default', className: 'round'})}
          {this.renderButtonGroups({name: 'Default', circle: true, children: <Icon name='heart'/>})}
        </View>
      </Row>
    )
  }
}
