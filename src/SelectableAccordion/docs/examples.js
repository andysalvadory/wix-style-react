export const checkboxExample = `
<SelectableAccordion
        type="checkbox"
        items={[
          {
            title: 'First row',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            initiallyOpen: true,
          },
          {
            title: 'Second row',
            subtitle: 'description',
            initiallyOpen: false,
            content: (
              <Text weight="bold">
                Lorem ipsum dolor sit amet,
                <br />
                consectetur adipiscing elit,
                <br />
                sed do eiusmod tempor incididunt ut labore
                <br />
                et dolore magna aliqua
              </Text>
            ),
          },
        ]}
      />
`;

export const radioButtonExample = `()=> {
const countries = [
      { name: 'Alabama', code: 'AL' },
      { name: 'Alaska', code: 'AK' },
      { name: 'Arizona', code: 'AZ' },
      { name: 'Arkansas', code: 'AR' },
      { name: 'California', code: 'CA' },
      { name: 'North Carolina', code: 'NC' },
      { name: 'Colorado', code: 'CO' },
      { name: 'Connecticut', code: 'CT' },
      { name: 'Delaware', code: 'DL' },
      { name: 'Florida', code: 'FL' },
      { name: 'Georgia', code: 'GA' },
      { name: 'Hawaii', code: 'HI' },
      { name: 'Idaho', code: 'IL' },
      { name: 'Illinois', code: 'IN' },
      { name: 'Indiana', code: 'IA' },
    ];
    const options = countries.map(country => ({
      ...country,
      value: country.name,
      id: country.code,
    }));

    return (
      <SelectableAccordion
        type="radio"
        items={[
          {
            title: 'First row',
            content: (
              <MultiSelect
                mode="select"
                tags={[]}
                onSelect={() => {}}
                onRemoveTag={() => {}}
                options={options}
                customSuffix={<TextButton>+ Add Tag</TextButton>}
              />
            ),
            initiallyOpen: true,
          },
          {
            title:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            subtitle: <span>I'm subtitle</span>,
            content: (
              <Text weight="bold">
                Lorem ipsum dolor sit amet,
                <br />
                consectetur adipiscing elit,
                <br />
                sed do eiusmod tempor incididunt ut labore
                <br />
                et dolore magna aliqua
              </Text>
            ),
          },
        ]}
      />)
}
`;

export const typesExample = `
<Layout>
    <Cell>
        <SelectableAccordion
            type="checkbox"
            items={[
              {
                title: 'First row',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              },
              {
                title: 'Second row',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              },
            ]}
         />
</Cell>
<Cell>
<SelectableAccordion
            type="radio"
            items={[
              {
                title: 'First row',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              },
              {
                title: 'Second row',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              },
            ]}
         />
</Cell>
<Cell>
<SelectableAccordion
            type="toggle"
            items={[
              {
                title: 'First row',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              },
              {
                title: 'Second row',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              },
            ]}
         />
</Cell>
</Layout>
`;
