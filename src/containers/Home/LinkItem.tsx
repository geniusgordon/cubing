import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = createStyles({
  link: {
    textDecoration: 'none',
  },
  paper: {
    padding: 20,
  },
  media: {
    height: 120,
    width: 120,
    margin: 'auto',
  },
});

interface Props extends WithStyles<typeof styles> {
  title: string;
  image: string;
  to: string;
}

function LinkItem({ classes, title, image, to }: Props) {
  return (
    <Link to={to} className={classes.link}>
      <Card>
        <CardActionArea>
          <CardMedia image={image} title={title} className={classes.media} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default withStyles(styles)(LinkItem);
