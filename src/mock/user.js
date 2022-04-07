import Mock from 'mockjs'

Mock.mock(new RegExp('/userList'), 'get', {
  'code': 200,
  'data': [
    {
      id: '@id',
      name: '@name'
    }
  ]
})
