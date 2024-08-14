"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter , useSearchParams} from "next/navigation";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from "@/app/components/Loader";

interface Chat {
    id: string;
    title: string;
}

interface Message {
    id: string;
    text: string;
    date: string;
    senderId: string;
}

export default function Page({ params }: { params: { id: string } }, ) {

    const [accounts, setAccounts] = React.useState<Chat[]>([]);
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [isLoadMessages, setIsLoadMessages] = React.useState(false);
    const [isLoadChats, setIsLoadCats] = React.useState(false);
    const pathname = usePathname();
  const { replace } = useRouter();
    const searchParams = useSearchParams();
    const chatId = searchParams.get('chatId');
    useEffect(() => {
        const getChats = async () => {
            setIsLoadCats(true);
            const response = await fetch(`/api/v1/telegram/accounts/getChats?id=${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const data = await response.json();
            setAccounts(data);
            } else {
                setAccounts([]);
            }
            setIsLoadCats(false)
            
        }

        getChats().then();
    }, [params.id]);

    useEffect(() => {
        const getMessages = async () => {
            // const chatId = "445948686";
            setIsLoadMessages(true);
            const response = await fetch(`/api/v1/telegram/accounts/getMessages?accountId=${params.id}&chatId=${chatId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const data = await response.json();
            console.log("data", data)
            setMessages(data);
            } else {
              setMessages([]);  
            }

            // const data = await response.json();
            // setMesseges(data);
            setIsLoadMessages(false);
        }
        console.log(chatId);
        if (chatId) {
            getMessages(); 
        }
       
    }, [chatId, params.id]);

    console.log(messages);

    const onClick = (chatId: string) => {
        console.log('click')
        const params = new URLSearchParams(searchParams);
        if (chatId) {
      params.set('chatId', chatId);
    } else {
      params.delete('chatId');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const listChats = accounts.map((account) => <ListGroup.Item key={account.id} action onClick={() => onClick(account.id)}>{account.title}</ListGroup.Item>);
    const listMessages = messages.map((message) => <ListGroup.Item
        key={message.id}
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
            <div className="fw-bold">{message.text}</div>
          {new Date(message.date).toISOString()}
        </div>
      </ListGroup.Item>);
    


    return (
        <Container>
            <h2>Account: {params.id}</h2>
            {isLoadChats && <Loader />}
            {!isLoadChats && <Row>
                
                <Col><ListGroup defaultActiveKey="#link1">
            {listChats}
        </ListGroup></Col>
                <Col style={{ overflow: "auto", maxHeight: '800px' }}>
                    {isLoadMessages && <Loader />}
                    {!isLoadMessages && <ListGroup>
            {listMessages}
        </ListGroup>}
                </Col>
      </Row>}
            {/*<h1>Session string: {session_string}</h1>*/}
            
            
        </Container>
    );
}
