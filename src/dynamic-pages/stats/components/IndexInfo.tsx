import React from 'react';
import { TidbIndexInfo } from "@ossinsight/api";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";

export interface IndexInfoProps {
  infos: TidbIndexInfo[];
}

export default function IndexInfo({ infos }: IndexInfoProps) {
  return (
    <Table className="clearTable">
      <TableHead>
        <TableRow>
          <TableCell>
            Index Name
          </TableCell>
          <TableCell>
            Columns
          </TableCell>
          <TableCell>
            Clustered
          </TableCell>
          <TableCell>
            Visible
          </TableCell>
          <TableCell>
            Unique
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {infos.map(info => (
          <TableRow key={info.indexName}>
            <TableCell>
              {info.indexName}
            </TableCell>
            <TableCell>
              {info.columns.split(',').map(column => <Chip key={column} size='small' label={column} sx={{m: 0.25}} />)}
            </TableCell>
            <TableCell>
              {info.clustered}
            </TableCell>
            <TableCell>
              {info.isVisible}
            </TableCell>
            <TableCell>
              {info.nonUnique ? 'NO' : 'YES'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
