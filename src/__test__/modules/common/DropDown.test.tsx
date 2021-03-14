import React from 'react';
import { render, screen } from '@testing-library/react';
import { DropDown } from '@/modules/common/input';

test('All the values are in dropdown', () => {
  render(
    <DropDown
      label="City"
      name="cities"
      options={['Mumbai', 'Pune', 'Delhi']}
      onChange={e => console.info('Clicked')}
      defaultValue="Mumbai"
    />
  );
  expect(screen.getByText('Mumbai')).toBeInTheDocument();
  expect(screen.getByText('Pune')).toBeInTheDocument();
  expect(screen.getByText('Delhi')).toBeInTheDocument();
});
