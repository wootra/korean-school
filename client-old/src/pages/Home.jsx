import { Grid, Item } from 'semantic-ui-react';
import MarketingCarousel from '../components/Home/MarketingCarousel';
import { useBooks } from '../contexts/BookContext';

const Home = () => {
    const { books } = useBooks();

    return (
        <>
            <MarketingCarousel />
            <div className=' max-w-7xl mx-auto'>
                <Grid className='p-4 gap-4'>
                    <Grid.Row columns='12' centered>
                        {books.map(book => (
                            <Grid.Column
                                key={book.id}
                                mobile='14'
                                tablet='7'
                                computer='7'
                                largeScreen='7'
                                className='p-2'
                            >
                                <Item.Group className='outline-gray-100 outline-offset-2 outline-2 outline shadow-md p-4'>
                                    <Item>
                                        {book.image ? (
                                            <Item.Image
                                                size='small'
                                                src={book.image}
                                            />
                                        ) : (
                                            <i className='ui image file image outline' />
                                        )}

                                        <Item.Content>
                                            <Item.Header>
                                                {book.title}
                                            </Item.Header>
                                            <Item.Meta>
                                                <span className='cinema'>
                                                    {book.author}
                                                </span>
                                            </Item.Meta>
                                            <Item.Description className='max-h-32 overflow-clip text-ellipsis'>
                                                {book.description?.length > 100
                                                    ? book.description.slice(
                                                          0,
                                                          100
                                                      ) + '...'
                                                    : book.description}
                                            </Item.Description>
                                            <Item.Extra>
                                                Additional Details
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                </Grid>
            </div>
        </>
    );
};

export default Home;
